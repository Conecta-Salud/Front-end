import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const loginWithFirebase = async (
  email: string,
  password: string
) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logoutFirebase = async () => {
  await signOut(auth);
};