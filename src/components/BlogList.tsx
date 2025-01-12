import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";
import { useEffect } from "react";
import SkeletonPost from "./Skeleton";

const BlogList = () => {
  const { posts, loading, getAllPosts } = useBlogs();

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <SkeletonPost key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
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
              
            <Link to={`/post/${post.id}`} className="text-blue-500 mt-4 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                Leer más
              </Link>  
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
