import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import BlogPage from "./pages/BlogPage";
import CreatePost from "./pages/CreatePost";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Blogs" element={<BlogPage />} />
        <Route path="/Login-page" element={<LoginPage />} />
        <Route path="/User-Page" element={<UserPage />} />
        <Route path="/Create-Post" element={<CreatePost />} />
        <Route path="/Edit-Profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
