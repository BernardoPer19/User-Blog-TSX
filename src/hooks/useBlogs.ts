import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/FirebaseConfing";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { PostType } from "../types/PostTypes";

export const useBlogs = (uid?: string) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener los posts de un usuario específico
  const fetchData = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "posts");
      const userPostQuery = query(collectionRef, where("authorID", "==", uid));
      const querySnapshot = await getDocs(userPostQuery);

      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostType[];

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error al obtener posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener todos los posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "posts");
      const postsSnapshot = await getDocs(collectionRef);

      const postsList = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        };
      }) as PostType[];

      setAllPosts(postsList);
      setPosts(postsList);
    } catch (error) {
      console.log("Error al obtener publicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (uid: string, post: PostType) => {
    if (!uid) {
      console.error("UID no proporcionado");
      return;
    }
  
    if (!post || typeof post !== "object") {
      console.error("El post proporcionado no es válido");
      return;
    }
  
    try {
      const collectionRef = collection(db, "posts");
      const newPost = { ...post, authorID: uid, createdAt: new Date() };
  
      // Agregar el post a Firestore
      const docRef = await addDoc(collectionRef, newPost);
  
      // Aquí ya Firestore ha generado el 'id', por lo que lo agregamos al objeto solo si no existe
      const postWithId = { ...newPost, id: docRef.id };
  
      // Ahora actualizamos el estado con el post completo
      setPosts((prevPosts) => [postWithId, ...prevPosts]);
    } catch (error) {
      console.error("Error al agregar el post:", error);
    }
  };
  
  // Función para eliminar un post
  const deleteBlog = async (id: string) => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchData(uid);
    } else {
      getAllPosts();
    }
  }, [uid, fetchData]);

  return {
    posts,
    allPosts,
    loading,
    addBlog,
    deleteBlog,
    getAllPosts,
    fetchData,
  };
};
