import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus.jsx";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-3 border-b-2 border-gray-300 bg-white shadow-lg">
      <div className="flex items-center">
        <img
          src="/burger_logo.jpg"
          alt="App Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      <nav className="flex items-center">
        <ul className="flex gap-8 text-lg font-semibold text-gray-700">
          {/* 
            <li> OnlineStatus: {useOnlineStatus() ? "✅ Online" : "🔴 Offline"}
            </li>  
            in this we have used span instead of div coz <div> is a block-level element, so it will appear on a new line (below “OnlineStatus:”).
            <span> is inline, so it stays on the same line. 
          */}
          <li>
            OnlineStatus: {useOnlineStatus() ? (<span className="text-green-500">✅ Online</span>) : (<span className="text-red-500">🔴 Offline</span>)}
          </li>
          <li>
            <Link to="/home" className="hover:text-blue-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="hover:text-blue-500 transition">
              Grocery
            </Link>
          </li>

          <li>
            <Link to="/cart" className="gap-3  hover:text-blue-500 transition flex"> Cart <img className= "pb w-10 h-10 " src="/cart.png" alt="cart-logo" /> </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;

/**  in anchor tag that is About up when we click whole page will rerender/refresh 
 *   But in Link tag that is Contact Us page will not refresh the whole page only the part which is changing will rerender
 * ***/