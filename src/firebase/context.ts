import { createContext } from "react";
import firebase, { Firebase } from "./firebase";

interface IFirebaseContext {
    user: firebase.User | null;
    firebase: Firebase;
};
const user: firebase.User | null = null;
const defaultContext: IFirebaseContext = { user, firebase};
const FirebaseContext = createContext(defaultContext);

export default FirebaseContext;
