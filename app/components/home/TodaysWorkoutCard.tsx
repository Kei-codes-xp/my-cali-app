"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { plans } from "@/data/plans";
import { getTodayWorkout } from "@/lib/getTodayWorkout";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";

type Level = keyof typeof plans;
type UserData = { level: Level; startDate: string };

const TodaysWorkoutCard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [today, setToday] = useState<ReturnType<typeof getTodayWorkout> | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() as UserData | undefined;

      if (!snap.exists() || !snap.data().level) {
        router.replace("/onboarding");
      }

      if (!data) return;

      setUserData(data);

      const plan = plans[data.level];
      const result = getTodayWorkout(plan, data.startDate);

      setToday(result);
    });

    return () => unsub();
  }, []);

  if (!userData || !today) return <p>Loading...</p>;

  const plan = plans[userData.level];
  const currentDay = plan?.[today.dayIndex];
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  if (!currentDay) return <p>Loading...</p>;

  const handleStart = () => {
    router.push(`/workout/${userData.level}/${currentDay.type}`);
  };

  const now = new Date();

  const dayShort = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="p-4 rounded-xl bg-[#161A16] text-white w-full m-8 flex flex-col gap-4">
      <h1>Today's Workout • {capitalize(userData.level)} Program</h1>
      <h2 className="text-3xl">
        {dayShort} - ({currentDay.title})
      </h2>

      <div className="w-full">
        <ul className="grid grid-cols-3 gap-2 h-30 mx-8">
          {currentDay.exercises.slice(0, 3).map((ex, j) => (
            <li key={j} className="bg-[#3D463D] p-4 rounded wrap-break-words">
              {ex.name} — {ex.sets} x {ex.reps}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex px-8">
        <button
          onClick={handleStart}
          className="bg-green-500 font-sans text-xl px-4 py-4 rounded w-full"
        >
          START WORKOUT
        </button>
      </div>
    </div>
  );
};

export default TodaysWorkoutCard;
