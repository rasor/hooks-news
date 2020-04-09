import { useEffect, useState } from "react";
import firebase from "../../firebase";

function useAuth() {
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
