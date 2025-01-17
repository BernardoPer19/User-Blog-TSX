import { Link } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext"; 
import { useState } from "react";

const NavBar = () => {
  const { user, hadleLogOut } = useBlogContext(); 
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => setMenuOpen(prevState => !prevState);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:underline">
            MyBlogs
          </Link>
        </h1>
        <ul className="flex space-x-6">

          <li>
            <Link to="/" className="hover:underline">
              Blogs
            </Link>
          </li>

          {user ? (
            <li>
              <Link to="/User-Page" className="hover:underline">
                User Page
              </Link>
            </li>
          ) : null}
        </ul>

     
        <div className="relative">
          <button onClick={toggleMenu} className="flex items-center space-x-2 focus:outline-none">
            <div className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {user ? user.displayName?.[0]?.toUpperCase() || "U" : "G"}
            </div>
            <span className="hidden sm:block">
              {user ? user.displayName || "User" : "Guest"}
            </span>
          </button>

       
          {menuOpen && (
            <div className="absolute z-50 right-0 mt-2 bg-white text-gray-800 rounded shadow-lg p-4 w-48">
              {user ? (
                <>
                  <p className="font-semibold mb-2">{user.displayName}</p>
                  <p className="text-sm mb-4">{user.email}</p>
                  <Link
                    to="/User-Page"
                    className="w-full text-left hover:underline"
                  >
                    Ir a Perfil
                  </Link>
                  <button
                    onClick={hadleLogOut}
                    className="w-full mt-2 text-left text-red-500 hover:underline"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/Login-page"
                    className="w-full text-left hover:underline"
                  >
                    Iniciar Sesión
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
