import { useBlogs } from "../hooks/useBlogs";
import { useEffect } from "react";

const BlogList = () => {
  const { posts, loading, getAllPosts } = useBlogs();

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando blogs...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-56 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200 ease-in-out">
              {post.title}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-4 hover:text-gray-700 transition duration-200 ease-in-out">
              {post.content}
            </p>
            <div className="mt-4 flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition duration-200 ease-in-out">
                Leer más
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
