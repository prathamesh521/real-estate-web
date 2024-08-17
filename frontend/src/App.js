import "./App.css";
import Home from "./components/Home";
import AddListings from "./components/AddListings";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import DetailPage from "./components/DetailPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-listings" element={<AddListings />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property/:id" element={<DetailPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
