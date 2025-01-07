import useAuth from "../hooks/useAuth"; 
import UserInfo from "./UserInfo";

const UserData = () => {
  const { user, hadleLogOut } = useAuth(); 
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-gray-50">
      {/* Banner de usuario con imagen provisional */}
      <div className="relative h-56 bg-cover bg-center" style={{ backgroundColor: "#42a9ff" }}>
        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 text-center">
          <img
            src={user?.photoURL || "https://www.citypng.com/public/uploads/preview/black-user-member-guest-icon-701751695037011q8iwf4mjbn.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white mx-auto"
          />
        </div>
      </div>

      {/* Información del usuario */}
    <UserInfo user={user} hadleLogOut={hadleLogOut}/>

      {/* <FeedForm/> */}
    </div>
  );
};

export default UserData;
