import { User as FirebaseUser } from "firebase/auth"; // Importa el tipo User de Firebase

interface UserInfoProps {
  user: FirebaseUser | null; 
  hadleLogOut: () => void;
}

const UserInfo = ({ user, hadleLogOut }: UserInfoProps) => {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 -mt-5">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold text-gray-800">
                {user?.displayName || "User"} {/* Si no hay nombre, se muestra "User" */}
              </h1>
              <p className="text-sm text-gray-600">{user?.email || "No email"}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => {/* Acción para editar perfil */}}
                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transform transition-all duration-200 ease-in-out"
              >
                Edit Profile
              </button>
              <button
                onClick={hadleLogOut}
                className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transform transition-all duration-200 ease-in-out"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="text-gray-700 space-y-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Account Created:</strong> {user?.metadata.creationTime || "Not available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
