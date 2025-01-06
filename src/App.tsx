import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
    <NavBar/>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/Login-page" element={<LoginPage/>} />
    <Route path="/User-Page" element={<UserPage/>} />
    </Routes>
    </>
  )
}

export default App
