import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { User } from "@/types/types";
import { onAuthStateChanged } from "firebase/auth";

export const useFirestoreUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        if (unsubscribeUser) unsubscribeUser();
        return;
      }

      try {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data() as User;
            setUser(userData);
            setError(null);
          } else {
            setUser(null);
            setError("User document not found in Firestore");
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user document:", error);
          setError("Error loading user data");
          setLoading(false);
        });

      } catch (error) {
        console.error("Error setting up user listener:", error);
        setError("Error setting up user listener");
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

  return { user, loading, error };
};