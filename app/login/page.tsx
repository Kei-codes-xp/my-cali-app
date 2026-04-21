"use client";

import { loginWithGoogle } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists() && snap.data().level) {
        router.replace("/home");
        return;
      }
    });

    return () => unsub();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to My Cali App</h1>
      <button onClick={loginWithGoogle}>Sign in with Google</button>
    </div>
  );
}
