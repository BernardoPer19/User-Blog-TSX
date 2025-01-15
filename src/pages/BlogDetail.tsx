import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/FirebaseConfing";
import { doc, getDoc } from "firebase/firestore";
import { PostType } from "../types/PostTypes";

function DetailsPage() {
  const { id } = useParams(); 
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (!id) {
          console.error("ID no proporcionado");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "posts", id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data() as PostType); 
        } else {
          console.log("No se encontró el post");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <img
        src={post.imageUrl || "/default-image.jpg"} 
        alt={post.title || "Post Image"}
        className="w-full h-[60vh] object-cover rounded-md mb-4"
      />
      <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
      <div className="my-4">
        <span className="ml-4 text-gray-500">
          {post.createdAt instanceof Date
            ? post.createdAt.toLocaleDateString("es-ES")
            : post.createdAt &&
              new Date(post.createdAt * 27).toLocaleDateString(
                "es-ES"
              )}
        </span>
      </div>
      <p className="text-lg text-gray-700">{post.content}</p>
    </div>
  );
}

export default DetailsPage;
