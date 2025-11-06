
import './Body.css';
import swiggy_API_data from './utils/swiggy_API_data.json';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from './utils/useOnlineStatus.jsx';

const IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// ---------------------- Restaurant Card ----------------------
const RestaurantCard = ({resData}) => {  

  const res_image = resData?.info?.cloudinaryImageId;
  return (
    <div className="res-card bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden p-4 m-4 w-72 text-center border border-gray-200 hover:scale-105">
      <img className='res-logo w-full h-44 object-cover rounded-md mb-3' src={IMG_CDN_URL + res_image} alt={resData.info.name} />
      <h2 className="text-lg font-bold text-gray-800">{resData.info.name}</h2>
      <h3 className="text-sm text-gray-500">{resData.info.areaName}</h3>
      <h3 className="text-sm text-gray-600">{resData.info.cuisines.join(", ")}</h3>
      <h3 className="text-sm font-medium text-amber-700 mt-1">{resData.info.costForTwo}</h3>
      <h3 className={`text-sm font-semibold mt-1 ${resData.info.avgRating >= 4 ? "text-green-600" : "text-red-600"}`}>{resData.info.avgRating}</h3>
    </div>
  );  
};

//---------------------- Extract Restaurant List ----------------------
const RestaurantList =
  swiggy_API_data?.data?.cards
  ?.find(c => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)//we have found the card which contains the restaurants array
  ?.card?.card?.gridElements?.infoWithStyle?.restaurants || []; //now we want to extract just the restaurants array inside it. [] if there is no restaurant array then it will be an empty array so that our map function does not break

// const resObj = [
//   {
//     name: "Burger King",
//     cuisine: "Burger, Fast Food",
//     image: "https://example.com/burgerking.jpg"
//   }
// ];

const Body = () => {
   
  //-------------------------filter feature-------------------------
  //let cardList=[{obj1},{obj2}];
  //const [cardList]=useState([{obj1},{obj2}]); 
  const [cardList, setCardList] = useState(RestaurantList);
//   RestaurantList → constant, holds full data and cardList → state, holds currently displayed restaurants.
  //const [RestaurantList] = useState([]); // to store the complete list of restaurants
  // //fetch data from api
  // const fetchData = async () => {
  //   try {
  //     const data = await fetch(
  //       "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
  //     );
  //     const json = await data.json();
  //     console.log(json);

  //     const RestaurantList = json?.data?.cards
  //       ?.find(c => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  //       ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
  //     setCardList(RestaurantList);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };  
  // useEffect(() => {
  //   fetchData(); 
  // }, []);
  //initially cardList is the whole restaurant list
  //setCardList is is function which is used to update the cardList
  const handle_filter=()=>{
    const filtereList = RestaurantList.filter(
      (res)=>{
        return res.info.avgRating>4.3
      }
    )
    setCardList(filtereList);
  }


  //-------------------------search feature-------------------------
  const [searchText, setSearchText] = useState(""); // "" means initially search text is empty

  const handleSearch=(e)=>{
    e.preventDefault();
    const filteredList = RestaurantList.filter(
      (r)=> r.info.name.toLowerCase().includes(searchText.toLowerCase()) || 
              res.info.cuisines.join(", ").toLowerCase().includes(searchText.toLowerCase())
    )  
    setCardList(filteredList);
  } 

  //--------------------online/offline feature-----------------------
  const isOnline=useOnlineStatus();
  if(!isOnline){
    return <h1 className="text-center text-2xl font-semibold text-red-600 mt-10">🔴 You are offline! Please check your internet connection.</h1>
  }
  
  return (
    <div className="body bg-gray-50 min-h-screen"> 

      <form className="search-container flex justify-center items-center gap-2 p-4 bg-white shadow-md rounded-md mx-6 my-4" onSubmit={handleSearch}>
        <input
          className='p-2 w-1/2 rounded-md border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none bg-gray-100'
          type="text"
          placeholder="Search Food or Restaurant"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} //  update text as user types
        />
        <button className='text-lg font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md px-4 py-2 transition-all duration-200 shadow-md' type="submit">Search</button>
      </form>

      <div className="filter flex justify-center">
        <button className="filter-btn border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-4 py-2 m-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200" onClick={ handle_filter } > 
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-card-all flex flex-wrap justify-center gap-4 px-4 pb-10">
        {/* <RestaurantCard resData={resObj[0]}/>
        <RestaurantCard resData={resObj[1]}/> */}
        {
          cardList.map((R,index)=>(
              <Link to={"/restaurantMe/"+R.info.id} key={index}> {/* "to" takes where to navigate when that card is clicked */}
                <RestaurantCard resData={R} />
              </Link>
            )
          )
          
        }
        

      </div>
    </div>
  );
};

export default Body;
