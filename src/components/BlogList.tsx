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
          className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
