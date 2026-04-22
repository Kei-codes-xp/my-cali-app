"use client";

import { loginWithGoogle } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import landing from "@/assets/landing.png";

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
    <div className="bg-[#111111] min-h-screen flex flex-col justify-between items-center px-6 py-12 md:py-20">
      <div className="relative w-300px h-300px md:w-400px md:h-400px flex justify-center items-center rounded-full bg-[#111111] overflow-hidden">
        <img
          src={landing.src}
          alt="Workout image"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-180px h-180px md:w-250px md:h-250px bg-[#99FF33] rounded-full z-[-1]" />
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col justify-center gap-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to</h1>
          <h1 className="text-3xl font-bold text-[#99FF33]">
            My Calithenics App
          </h1>
        </div>

        <div className="space-y-4">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-x-2.5 bg-black text-white py-4 px-6 rounded-full border border-gray-700 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5416 8.16335C15.5416 7.61168 15.4975 7.05168 15.4016 6.505H8V9.65083H12.2333C12.0625 10.5925 11.5166 11.4167 10.7066 11.9567V14.0067H13.1616C14.605 12.6783 15.5416 10.6383 15.5416 8.16335Z"
                fill="#4285F4"
              />
              <path
                d="M8 15.8333C10.125 15.8333 11.9167 15.1317 13.1616 14.0067L10.7066 11.9567C10.0216 12.4208 9.11 12.6825 8 12.6825C5.93917 12.6825 4.19417 11.3008 3.56417 9.41668H1.01167V11.3967C2.33333 14.0208 5.04583 15.8333 8 15.8333Z"
                fill="#34A853"
              />
              <path
                d="M3.56417 9.41668C3.235 8.44168 3.235 7.39168 3.56417 6.41668V4.43668H1.01167C-0.0933333 6.64585 -0.0933333 9.18752 1.01167 11.3967L3.56417 9.41668Z"
                fill="#FBBC04"
              />
              <path
                d="M8 3.15083C9.13083 3.12917 10.2183 3.55167 11.0366 4.34667L13.2116 2.17167C11.83 0.880833 10.04 0.170833 8 0.166667C5.04583 0.166667 2.33333 1.97917 1.01167 4.43668L3.56417 6.41668C4.19417 4.5325 5.93917 3.15083 8 3.15083Z"
                fill="#EA4335"
              />
            </svg>
            Login with gmail
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-400 mt-10 md:mt-16"></div>
    </div>
  );
}
