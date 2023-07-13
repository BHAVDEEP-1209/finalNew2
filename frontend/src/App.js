import {Routes , Route} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import AddProduct from "./pages/AddProduct"
import ProductDetail from "./pages/ProductDetail"
import "./Styles/App.scss"
import Profile from "./pages/Profile";
import Store from "./components/Store";
import Account from "./components/Account";
import Orders from "./components/Orders";
import Drafts from "./components/Drafts";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);

  const private1 = [
    {
      path : "/",
      element : <Register />
    },
    {
      path : "/login",
      element : <Login />
    },
    {
      path : "*",
      element : <Login />
    },
  ]


  const private2 = [
    {
      path : "/homepage",
      element : <Homepage />
    },
    {
      path : "/addProduct",
      element : <AddProduct />
    },
    {
      path : "/cart",
      element : <Cart />
    },
    {
      path : "/productDetail/:id",
      element : <ProductDetail />
    },
    {
      path : "/addProduct/:id",
      element : <AddProduct />
    },
    {
      path : "*",
      element : <Homepage />
    },
  ]
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>

        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/addProduct" element={<AddProduct />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/productDetail/:id" element={<ProductDetail />}/>
        <Route path="/addProduct/:id" element={<AddProduct />}/> */}

        {
          isLoggedIn ? <>
          {
            private2.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
          </> : <>
          {
            private1.map((ele)=>{
              return <Route path={ele.path} element={ele.element} />
            })
          }
          </>
        }
        {
          isLoggedIn && <Route path="profile" element={<Profile />}>
          <Route index element={<Store />} />
          <Route path="store" element={<Store />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="account" element={<Account />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        }

      </Routes>
    </div>
  );
}

export default App;
