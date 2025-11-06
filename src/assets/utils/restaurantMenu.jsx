// //import { useEffect } from "react";
// import swiggy_API_data from "./swiggy_API_data.json";
// import { useParams } from "react-router-dom";
// import './restaurantCategories.jsx';
// import new_data from "./new_data.json";
 
// // console.log(swiggy_API_data);
// console.log(new_data);

// const RestaurantMenu = () =>{

//     const {resId}=useParams();


//     const menuList= swiggy_API_data?.data?.cards
//      ?.find(c => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
//      ?.card?.card?.gridElements?.infoWithStyle?.restaurants || []; 

//     // useEffect(()=>{
//     //     //API call
//     //     // fetchMenu(); 
//     // },[]);

//     //we are not using this as api is not working because cors policy error but you can bypass it using extesion

//     // const fetchMenu=async()=>{
//     //     const data=await fetch("https://www.swiggy.com/dapi/menu/v4/full?lat=12.9351929&lng=77.62448069999999&menuId=229");
//     //     const json=await data.json();
//     //     console.log(json);
//     // }
//     const Res_categories= swiggy_API_data?.data?.cards
//      ?.filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") || []; 
//     console.log(Res_categories,"res categories");

//     const restaurant=menuList.find((r)=>r.info.id==resId);
//     const final=restaurant?.info;
//     return(
//         <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-3xl font-bold text-gray-800 mb-3">{final.name}</h2>
//             <h1 className="text-xl font-semibold text-gray-700 mb-5">Restaurant Menu</h1>
//             <ul className="space-y-2 text-gray-600 text-lg">
//                 <li><span className="font-medium text-gray-800">Area:</span> {final.areaName}</li>
//                 <li><span className="font-medium text-gray-800">Cost for Two:</span> {final.costForTwo}</li>
//                 <li><span className="font-medium text-gray-800">Locality:</span> {final.locality}</li>
//                 <li><span className="font-medium text-gray-800">Delivery Time:</span> {final.sla?.slaString}</li>
//                 <li><span className="font-medium text-gray-800">Cuisines:</span> {final.cuisines?.join(", ")}</li>
//                 <li><span className="font-medium text-gray-800">Average Rating:</span> {final.avgRating}</li>
//             </ul>

//             {Res_categories.map((c)=>(
//                 <restaurantCategories/>
//             ))}
//         </div>
//     )
// }
// export default RestaurantMenu;


// RestaurantMenu.jsx
import { useParams } from "react-router-dom";
import swiggy_API_data from "./swiggy_API_data.json";
import new_data from "./new_data.json";
import RestaurantCategories from "./restaurantCategories"; // capitalized import

const RestaurantMenu = () => {
  const { resId } = useParams();

  // find restaurant info from swiggy_API_data
  const menuList =
    swiggy_API_data?.data?.cards
      ?.find((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  const restaurant = menuList.find((r) => r.info.id == resId);
  const final = restaurant?.info;

  // filter out menu categories from new_data
  const Res_categories =
    new_data?.data?.cards?.filter(
      (c) =>
        c?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some(
          (d) =>
            d?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        )
    ) || [];

  console.log("Categories found:", Res_categories);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{final?.name}</h2>
      <h1 className="text-xl font-semibold text-gray-700 mb-5">
        Restaurant Menu
      </h1>
      <ul className="space-y-2 text-gray-600 text-lg">
        <li>
          <span className="font-medium text-gray-800">Area:</span>{" "}
          {final?.areaName}
        </li>
        <li>
          <span className="font-medium text-gray-800">Cost for Two:</span>{" "}
          {final?.costForTwo}
        </li>
        <li>
          <span className="font-medium text-gray-800">Locality:</span>{" "}
          {final?.locality}
        </li>
        <li>
          <span className="font-medium text-gray-800">Delivery Time:</span>{" "}
          {final?.sla?.slaString}
        </li>
        <li>
          <span className="font-medium text-gray-800">Cuisines:</span>{" "}
          {final?.cuisines?.join(", ")}
        </li>
        <li>
          <span className="font-medium text-gray-800">Average Rating:</span>{" "}
          {final?.avgRating}
        </li>
      </ul>

      <div className="mt-8">
        {Res_categories.length > 0 ? (
          Res_categories.map((cat, idx) => (
            <RestaurantCategories key={idx} category={cat} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
