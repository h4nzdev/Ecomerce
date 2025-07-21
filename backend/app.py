from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import google.generativeai as genai
import json
from product_data import product_data

app = Flask(__name__)
CORS(app)
db_path = "ecommerce.db"

def db_init() :
    conn = sqlite3.connect(db_path)
    # Create users table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
        )             
    """)
    
    # Create orders table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS orders(
            id INTEGER PRIMARY KEY,
            user_id INTEGER NOT NULL,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            total_amount REAL NOT NULL,
            payment_method TEXT NOT NULL,
            delivery_method TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)
    
    # Create order_items table for individual items in each order
    conn.execute("""
        CREATE TABLE IF NOT EXISTS order_items(
            id INTEGER PRIMARY KEY,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_title TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
        )
    """)
    
    conn.commit()
    conn.close()
    
GOOGLE_API_KEY = "Your api key"
genai.configure(api_key=GOOGLE_API_KEY)

# Create a Gemini chat model instance
model = genai.GenerativeModel("gemini-2.0-flash")
chat_session = model.start_chat(history=[])

@app.route("/api/gemini-chat", methods=["POST"])
def gemini_chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"reply": "No message received"}), 400

    try:
        # ✅ Build the custom prompt
        prompt = f"""
        You are a shopping assistant. Use the product list below to help the user.

        Product list:
        {json.dumps(product_data, indent=2)}

        User said: "{user_message}"

        Respond with helpful suggestions or answers using the product data.
        """

        # ✅ Send to Gemini
        response = chat_session.send_message(prompt)

        return jsonify({"reply": response.text})

    except Exception as e:
        print("💥 Gemini Error:", str(e))
        return jsonify({"reply": f"Error: {str(e)}"}), 500
    
@app.route("/api/login", methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Simple query to check email and password
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()
    
    conn.close()
    
    if user:
        # Return user info without password
        return jsonify({
            "success": True,
            "user": {
                "id": user[0],
                "username": user[1],
                "email": user[2],
                "phone": user[4],
                "address": user[5]
            }
        })
    else:
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

# Simple route to add a test user
@app.route("/api/register", methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone', '')  # Default empty string if not provided
    address = data.get('address', '')  # Default empty string if not provided
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        cursor.execute("""
            INSERT INTO users (username, email, password, phone, address)
            VALUES (?, ?, ?, ?, ?)
        """, (username, email, password, phone, address))
        conn.commit()
        
        return jsonify({
            "success": True,
            "message": "User registered successfully"
        })
    except sqlite3.IntegrityError:
        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 400
    finally:
        conn.close()

# Create a new order
@app.route("/api/orders", methods=['POST'])
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items', [])
    total_amount = data.get('total_amount')
    payment_method = data.get('payment_method')
    delivery_method = data.get('delivery_method')
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Create order
        cursor.execute("""
            INSERT INTO orders (user_id, total_amount, payment_method, delivery_method)
            VALUES (?, ?, ?, ?)
        """, (user_id, total_amount, payment_method, delivery_method))
        
        order_id = cursor.lastrowid
        
        # Add order items
        for item in items:
            cursor.execute("""
                INSERT INTO order_items (order_id, product_id, product_title, quantity, price)
                VALUES (?, ?, ?, ?, ?)
            """, (order_id, item['id'], item['title'], item['quantity'], item['price']))
        
        conn.commit()
        return jsonify({
            "success": True,
            "order_id": order_id,
            "message": "Order created successfully"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400
    finally:
        conn.close()

# Get user's orders
@app.route("/api/orders/<int:user_id>")
def get_user_orders(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Get orders with their items
        cursor.execute("""
            SELECT 
                o.id, 
                o.order_date, 
                o.total_amount, 
                o.payment_method,
                o.delivery_method,
                o.status
            FROM orders o
            WHERE o.user_id = ?
            ORDER BY o.order_date DESC
        """, (user_id,))
        
        orders = []
        for row in cursor.fetchall():
            order = {
                "id": row[0],
                "order_date": row[1],
                "total_amount": row[2],
                "payment_method": row[3],
                "delivery_method": row[4],
                "status": row[5],
                "items": []
            }
            
            # Get items for this order
            cursor.execute("""
                SELECT product_id, product_title, quantity, price
                FROM order_items
                WHERE order_id = ?
            """, (order["id"],))
            
            order["items"] = [{
                "product_id": item[0],
                "title": item[1],
                "quantity": item[2],
                "price": item[3]
            } for item in cursor.fetchall()]
            
            orders.append(order)
        
        return jsonify({
            "success": True,
            "orders": orders
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400
    finally:
        conn.close()

@app.route("/api/delete/<int:id>", methods=["DELETE"])
def delete_history(id) :
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON") 
    conn.execute("DELETE FROM orders WHERE id=?", (id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message" : "Deleted successully", "success": True})

if __name__ == "__main__":
    db_init()
    app.run(debug=True)
    
    

