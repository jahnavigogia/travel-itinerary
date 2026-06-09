import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GoogleSuccess from "./pages/GoogleSuccess";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Trips from "./pages/Trips";
import CreateDestination from "./pages/CreateDestination";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path='register/' element={<Register />} />
        <Route path='profile/' element={<Profile />} />
        <Route path='trips/' element={<Trips />} />
        <Route path="/destination/create" element={<CreateDestination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
