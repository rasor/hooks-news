import { useEffect, useState } from "react";
import firebase from "../../firebase";

function useAuth() {
  const [authUser, authUserSet] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        authUserSet(user);
      } else {
        authUserSet(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return authUser;
}

export default useAuth;
