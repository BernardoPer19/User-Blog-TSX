import { useState } from "react";
import useAuth from "../hooks/useAuth"; // Usamos tu hook personalizado

const LoginForm = () => {
  const { handleLogin, handleSignUp, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Solo para registro
    errors: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [isLogin, setIsLogin] = useState(true); // Estado para saber si estamos en login o registro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const validateForm = () => {
    const errors = { email: "", password: "", name: "" };

    if (!formData.email) {
      errors.email = "Email is required.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!isLogin && !formData.name) { // Solo validamos el nombre si no estamos en login
      errors.name = "Name is required.";
    }

    setFormData((prev) => ({
      ...prev,
      errors,
    }));

    return !errors.email && !errors.password && (isLogin || !errors.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        await handleLogin(formData.email, formData.password);
      } else {
        await handleSignUp(formData.email, formData.password, formData.name);
      }
    
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {formData.errors.email && (
            <p className="text-sm text-red-600">{formData.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {formData.errors.password && (
            <p className="text-sm text-red-600">{formData.errors.password}</p>
          )}
        </div>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.errors.name && (
              <p className="text-sm text-red-600">{formData.errors.name}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <strong
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 cursor-pointer ml-2"
        >
          {isLogin ? "Sign up" : "Login"}
        </strong>
      </div>
    </div>
  );
};

export default LoginForm;
