import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const loginWithFirebase = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  const token = await user.getIdToken();

  return {
    token,
    user: {
      uid: user.uid,
      email: user.email,
    },
  };
};

export const logoutFirebase = async () => {
  await signOut(auth);
  localStorage.removeItem("token");
};