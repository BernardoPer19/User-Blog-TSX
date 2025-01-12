import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import BlogPage from "./pages/BlogPage";
import CreatePost from "./pages/CreatePost";
import DetailsPage from "./pages/BlogDetail"; // Importa el componente DetailsPage

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/Login-page" element={<LoginPage />} />
        <Route path="/User-Page" element={<UserPage />} />
        <Route path="/Create-Post" element={<CreatePost />} />
        <Route path="/post/:id" element={<DetailsPage />} /> {/* Ruta añadida */}
      </Routes>
    </>
  );
}

export default App;
