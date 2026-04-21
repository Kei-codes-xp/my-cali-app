import { auth } from "./firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
};

export const logout = async () => {
  await signOut(auth);
};
