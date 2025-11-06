import './index.css'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './assets/utils/about.jsx'
import Contact from './assets/utils/contact.jsx'
import Error from './assets/utils/error.jsx'
import Body from './assets/Body'
import Cart from './assets/utils/cart.jsx'
import RestaurantMenu from './assets/utils/restaurantMenu.jsx'
// import Grocery from './assets/utils/grocery.jsx'


//for grocery.....in newtwok(inspect) tab we can see that grocery.jsx is loaded only when we click on grocery link
// and not before that and we will have two .js files 1 is main.js and other is grocery.jsx.js
//chunking
//code splitting
//lazy loading
//dynamic loading

// const Grocery=()=>lazy(()=>import('./assets/utils/grocery.jsx')); this is the line that do all things
//and also we have to wrap grocery component in Suspense component as when react is fetching or loading the grocery component it may take some time if there is nothing it throww error
//coz when we click on grocery link react does not know what to load so it will throww err

const Grocery=lazy(()=>import('./assets/utils/grocery.jsx')); //this is the line that do all things

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {/*optimizing code by splitting code in new js check on network and a js file appear when we click but it was not rendered initially*/
        path:"/grocery",
        element:(
          <Suspense fallback={<h1>Loading....</h1>}> 
            <Grocery/>
          </Suspense>
        )
      },
      {
        path:"/home",
        element:<Body/>
      },
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"/restaurantMe/:resId",
        element:<RestaurantMenu/>
      },
      {
        path:"/about",
        element:<About/> //keep in mind component name should be in capital letter
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
    errorElement:<Error/>, //OR <h1>404 Not Found</h1>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)