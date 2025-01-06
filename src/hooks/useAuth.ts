import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase/FirebaseConfing";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/User-Page");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name,
        email,
        createdAt: new Date(),
      });

      setUser(user);
      navigate("/User-Page");
    } catch (error: any) {
      setError("Error al crear cuenta: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser(user);
      navigate("/User-Page");
    } catch (error: any) {
      setError("Error al iniciar sesión: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hadleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    loading,
    error,
    handleSignUp,
    handleLogin,
    hadleLogOut
  };
};

export default useAuth;
