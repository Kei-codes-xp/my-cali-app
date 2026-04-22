import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export const createWorkout = async (userId: string, name: string) => {
  return await addDoc(collection(db, "users", userId, "workouts"), {
    name,
    createdAt: new Date(),
  });
};

export const addExercise = async (
  userId: string,
  workoutId: string,
  exercise: {
    name: string;
    sets: number;
    reps: number;
    rest: number;
  },
) => {
  return await addDoc(
    collection(db, "users", userId, "workouts", workoutId, "exercises"),
    exercise,
  );
};

export const saveWorkout = async (userId: string, data: any) => {
  const id = `${userId}_${data.date}`;

  await setDoc(doc(db, "workouts", id), data);
};
