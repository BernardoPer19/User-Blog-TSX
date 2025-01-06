import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";

const AddBlogForm = () => {
  const { addBlog, loading } = useBlogs();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.imageUrl) {
      alert("Por favor completa todos los campos");
      return;
    }

    const uid = "demo-user-id"; // Cambia esto con el ID del usuario real
    await addBlog(uid, formData);
    setFormData({ title: "", content: "", imageUrl: "" });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Agregar Nuevo Blog</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Contenido"
        rows={5}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="URL de la Imagen"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Agregando..." : "Agregar Blog"}
      </button>
    </form>
  );
};

export default AddBlogForm;
