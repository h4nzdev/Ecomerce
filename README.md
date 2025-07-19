# Modern E-commerce UI

A modern, responsive e-commerce user interface built with React, Tailwind CSS, and Vite. This project demonstrates a clean and user-friendly design for an online shopping experience.

![Project Preview](./src/assets/react.svg)

## Features

- 🏠 **Home Page**
  - Product grid layout
  - Category filtering system
  - Product cards with image and details
  - Loading states and error handling

- 🛒 **Shopping Cart**
  - Clean and organized cart interface
  - Product quantity management
  - Cart total calculation

- 👤 **User Account Dashboard**
  - Profile information display
  - Order history tracking
  - Quick stats overview (Total Orders, Total Spent, Saved Items)
  - Payment method management
  - Shipping address management

- 🔐 **Authentication**
  - User-friendly login interface
  - Form validation
  - Secure authentication flow

## Technologies Used

- ⚛️ **React** - Frontend library
- 🚦 **React Router** - Navigation and routing
- 🎨 **Tailwind CSS** - Styling and design
- ⚡ **Vite** - Build tool
- 📦 **Axios** - API requests
- 🎯 **Lucide React** - Icon system

## Project Structure

```
src/
├── components/
│   ├── Nav/
│   │   ├── Nav.jsx
│   │   └── NavLinks.jsx
│   ├── ProductCards/
│   │   ├── ProductCard.jsx
│   │   └── Products.jsx
│   ├── Category/
│   │   └── CategoryFilter.jsx
│   └── Loading.jsx
├── pages/
│   ├── Home.jsx
│   ├── Cart.jsx
│   ├── Account.jsx
│   └── Login.jsx
└── assets/
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/h4nzdev/Ecomerce.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Features Showcase

### Home Page
- Responsive product grid
- Category-based filtering
- Clean and modern UI
- Loading states for better UX

### Account Dashboard
- User profile overview
- Order history with status tracking
- Purchase statistics
- Saved payment methods
- Shipping information

### Shopping Cart
- Product list with details
- Quantity adjustments
- Total calculation
- Checkout process

## Design Philosophy

The UI is built with a focus on:
- Clean and minimal design
- Consistent spacing and typography
- Responsive layout for all screen sizes
- User-friendly interactions
- Clear visual hierarchy

## API Integration

The project uses the Fake Store API (https://fakestoreapi.com) for product data, demonstrating:
- Product fetching
- Category filtering
- Error handling
- Loading states

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating your feature branch
3. Committing your changes
4. Pushing to the branch
5. Creating a new Pull Request

## License

This project is open source and available under the MIT License.

---

Created with 💙 by [h4nzdev](https://github.com/h4nzdev)
