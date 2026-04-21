import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export const saveUserLevel = async (userId: string, level: string) => {
  await setDoc(doc(db, "users", userId), {
    level,
    startDate: new Date().toISOString(),
    createdAt: new Date(),
  });
};
