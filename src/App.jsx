import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AddProduct from "./Pages/AddProduct";
import Footer from "./Components/Footer/Footer";
import SubFooter from "./Components/Footer/SubFooter";
import AuthProvider from "./Context/AuthContext";


function App() {
  return (
    <>  
    {/* <> A fragment is a lightweight container used to wrap multiple elements without adding an extra node to the DOM.
      when you need to return multiple elements from a component's render method,
      when don't want to introduce an unnecessary parent element. */}


      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
        <Footer/>
        <SubFooter/>
      </AuthProvider>
    </>
  );
}

export default App;
