"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import app from "@/lib/firebase";

const db = getFirestore(app);

export default function Onboarding() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ✅ add this

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onboarding auth:", user);

      if (user) {
        setUserId(user.uid);
      } else {
        if (!loading) {
          router.replace("/login");
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const selectLevel = async (level: string) => {
    if (!userId) return;

    await setDoc(
      doc(db, "users", userId),
      {
        level,
        startDate: new Date().toISOString(),
        createdAt: new Date(),
      },
      { merge: true },
    );

    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>Choose Your Level</h1>

      <button onClick={() => selectLevel("beginner")}>Beginner</button>
      <button onClick={() => selectLevel("intermediate")}>Intermediate</button>
      <button onClick={() => selectLevel("advanced")}>Advanced</button>
    </div>
  );
}
