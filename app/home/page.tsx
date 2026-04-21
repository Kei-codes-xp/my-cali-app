"use client";

import TodaysWorkoutCard from "../components/home/TodaysWorkoutCard";
import LogoutButton from "../components/ui/LogoutButton";

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl items-center justify-center">
        <TodaysWorkoutCard />
      </main>
    </div>
  );
}
