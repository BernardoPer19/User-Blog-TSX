import { Route, Routes } from "react-router-dom"
// import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <>
    <Routes>
    {/* <Route path="/" element={<HomePage/>} /> */}
    <Route path="/" element={<LoginPage/>} />
    <Route path="/User-Page" element={<UserPage/>} />
    </Routes>
    </>
  )
}

export default App
