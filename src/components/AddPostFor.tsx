import { useState, ChangeEvent, FormEvent } from "react";
import { useBlogContext } from "../context/BlogContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfing";

const AddPostForm = () => {
  const { user } = useBlogContext();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("El título y el contenido son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const postRef = collection(db, "posts");
      const newPost = {
        title,
        content,
        authorID: user?.uid || "anónimo",
        createdAt: new Date(),
      };

      await addDoc(postRef, newPost);

      setTitle("");
      setContent("");
      setImageUrl("");
      setImageFile(null);
      setError(null);
      alert("¡Post creado con éxito!");
    } catch (err) {
      console.error("Error al crear el post:", err);
      setError("Hubo un error al crear el post. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Crear Nuevo Post
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-gray-600 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe el título del post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-600 font-medium mb-2">
              Contenido
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleInputChange}
              placeholder="Escribe el contenido de tu post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="image" className="block text-gray-600 font-medium mb-2">
              Imagen
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Vista previa"
                className="w-full mt-4 h-56 object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-600 font-medium mb-2">
              O URL de imagen
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/imagen.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creando..." : "Crear Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
