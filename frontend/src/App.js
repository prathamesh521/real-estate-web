import "./App.css";
import Home from "./components/Home";
import AddListings from "./components/AddListings";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import DetailPage from "./components/DetailPage";
import UserDashboard from "./components/UserDashboard";
import Profile from "./components/Profile";
import EditProduct from "./components/EditProduct";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-listings" element={<UserDashboard />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:slug" element={<DetailPage />} />
        <Route path="/products/:slug/edit" element={<EditProduct/>} />
        <Route path="/profile" element={<Profile/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
