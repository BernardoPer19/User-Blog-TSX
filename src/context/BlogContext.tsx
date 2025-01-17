import { createContext, useContext, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { useBlogs } from "../hooks/useBlogs";
import { PostType } from "../types/PostTypes";
import { User } from "firebase/auth";

interface BlogContextType {
  user: User | null;
  allPosts: PostType[]; 
  posts: PostType[];
  hadleLogOut: () => void;
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (email: string, password: string, name:string) => void;
  getAllPosts: () => Promise<void>;
  fetchData: (uid: string) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  addBlog: (uid: string, post:PostType) => Promise<void>;
  error: string | null;
  loading: boolean
}
const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const { error, hadleLogOut, handleLogin, handleSignUp, user} = useAuth();
  const { addBlog, allPosts, deleteBlog, fetchData, getAllPosts, posts,loading } = useBlogs(user?.uid);

  const value: BlogContextType = {
    user,
    allPosts,
    posts,
    hadleLogOut,
    handleLogin,
    handleSignUp,
    getAllPosts,
    fetchData,
    deleteBlog,
    addBlog,
    error,
    loading
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext debe usarse dentro de un BlogProvider");
  }
  return context;
};

export default BlogContext;
