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
    <section className="w-[90%] md:mt-0 mt-4 rounded shadow-lg p-6 flex flex-col md:flex-row text-center justify-between items-center">
      <h2 className="md:text-2xl font-semibold md:mb-0 mb-4">
        Shop your favorite products for less.
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
