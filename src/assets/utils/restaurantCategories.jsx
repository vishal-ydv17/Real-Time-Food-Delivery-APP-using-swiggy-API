
// const restaurantCategories = () => {
//     return <div>
//         {/*header  */}
//             <h1>Res categories</h1>
//         {/*body  */}
//     </div>
// }

// export default restaurantCategories;

import { useState } from "react";

const RestaurantCategories = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemCategory =
    category?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )?.card?.card;

  if (!itemCategory) return null;

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          {itemCategory.title}
        </h2>
        <span className="text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="pl-4 mt-2 space-y-2">
          {itemCategory.itemCards?.map((item) => (
            <div
              key={item.card.info.id}
              className="p-2 border border-gray-100 rounded-md bg-gray-50"
            >
              <h3 className="font-medium text-gray-800">
                {item.card.info.name}
              </h3>
              <p className="text-gray-600 text-sm">
                ₹{item.card.info.price / 100}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
