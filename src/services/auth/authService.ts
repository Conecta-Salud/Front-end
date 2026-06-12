import {
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const loginWithFirebase = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logoutFirebase = async () => {
  await signOut(auth);
};

export const changeFirebasePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const firebaseUser = auth.currentUser;

  if (!firebaseUser?.email) {
    throw new Error("No hay usuario autenticado.");
  }

  const credential = EmailAuthProvider.credential(
    firebaseUser.email,
    currentPassword
  );

  await reauthenticateWithCredential(firebaseUser, credential);

  await updatePassword(firebaseUser, newPassword);
};
