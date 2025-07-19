import React from "react";
import { filters } from "../../data/filter";
import { Gem, Laptop, Shirt, Venus } from "lucide-react";

const iconMap = {
  Shirt: Shirt,
  Gem: Gem,
  Laptop: Laptop,
  Venus: Venus,
};
const CategoryFilter = ({ selected, onFilterChange }) => {
  return (
    <section className="w-[90%] rounded shadow-lg p-6 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        Find your favorite products in a lower price
      </h2>
      <div className="flex gap-4">
        {filters.map((item, index) => {
          const Icon = iconMap[item.icon];
          const isActive = selected === item.value;

          return (
            <div key={index} className="text-center">
              <Icon
                size={44}
                onClick={() => onFilterChange(item.value)}
                className={`p-2 rounded-full cursor-pointer duration-100 ${
                  isActive
                    ? "bg-blue-500 text-white scale-105"
                    : "bg-slate-800 text-white hover:scale-[1.05]"
                }`}
                title={item.name}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilter;
