import React from "react";
import TimerCircle from "../../../components/workout/TimerCircle";

const page = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center h-full max-w-3xl py-10 sm:py-16 md:py-24 px-4 sm:px-8 md:px-">
        <TimerCircle />
      </main>
    </div>
  );
};

export default page;
