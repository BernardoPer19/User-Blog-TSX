import { useEffect } from "react";
import { useBlogContext } from "../context/BlogContext";

const UserBlogList = () => {
  const { posts, fetchData, loading, user,deleteBlog } = useBlogContext(); 

  useEffect(() => {
    if (user?.uid) {
      console.log("Fetching data for user:", user.uid);  // Verifica si el uid está presente
      fetchData(user.uid); 
    }
  }, [user, fetchData]); // Dependencias: se ejecuta solo cuando user o fetchData cambian

  // Añadir un mensaje de depuración
  console.log("Posts data:", posts);

  if (loading) return <p className="text-center text-gray-500">Cargando tus blogs...</p>;

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Aún no has publicado ningún blog.
      </p>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold p-5">Tus Posts</h1>
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
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>
            </div>
            <button 
            onClick={()=>deleteBlog(post.id)}
            className="bg-red-500 hover:bg-red-600 w-full py-3 text-white">Delete Blog</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserBlogList;
