"use client";
import React from "react";
import { workouts } from "@/data/workouts";
import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useParams } from "next/navigation";

const TimerCircle = ({ duration = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    nextExercise();
  }, [timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTimeLeft(duration);
  };

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const radius = 200;
  const circumference = 2 * Math.PI * radius;

  const progress = (timeLeft / duration) * circumference;

  const params = useParams();
  const level = params.level as string;
  const type = params.type as string;

  console.log("Params:", params);
  if (!params?.level || !params?.type) {
    return <p>Loading route...</p>;
  }

  const workout = workouts[level]?.find((w) => w.type === type);

  const currentExercise = workout?.exercises?.[currentIndex];

  if (!workout || !currentExercise) {
    return <p>Loading workout...</p>;
  }
  const totalExercises = workout.exercises.length;
  const progressBar = ((currentIndex + 1) / totalExercises) * 100;

  const nextExercise = () => {
    setIsRunning(false);

    const totalSets = currentExercise.sets;

    //  still have sets left
    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      setTimeLeft(duration);
      return;
    }

    //  move to next exercise
    if (currentIndex < totalExercises - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSet(1); // reset sets
      setTimeLeft(duration);
    } else {
      setTimeLeft(0); // workout done
    }
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center border-amber-50 border-2 justify-between gap-4 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mb-8 flex flex-col items-center justify-center w-full">
          <svg className="w-full h-2">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="6"
              className=" fill-[#2D2D2D]"
            />

            <rect
              x="0"
              y="0"
              width={`${progressBar}%`}
              height="100%"
              rx="6"
              className="fill-[#22C55E] transition-all duration-300 ease-out"
            />
          </svg>
        </div>
        <div className="relative">
          <div className=" w-full h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl">{currentExercise.name}</h1>
            <p className="text-lg">
              Set {currentSet} of {currentExercise.sets} •{" "}
              {currentExercise.reps} Reps
            </p>
          </div>
          <svg viewBox="0 0 500 500" className="w-120 h-120 -rotate-90">
            <circle
              cx="250"
              cy="250"
              r={radius}
              stroke="gray"
              strokeWidth="8"
              fill="transparent"
              className="opacity-20"
            />

            <circle
              cx="250"
              cy="250"
              r={radius}
              stroke="#22C55E"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              className="transition-all duration-100 linear"
            />
          </svg>

          {/* Time text */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
            {formatTime(timeLeft)}
          </div>
          <div className="absolute inset-30 flex items-end justify-center text-6xl font-bold">
            {isRunning && (
              <span className="text-3xl font-medium text-[#22C55E]">REST</span>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center items-center pointer ">
          <button
            onClick={toggleTimer}
            className="text-4xl p-8 rounded-full bg-[#22C55E] flex items-center justify-center"
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full pt-8">
          Exercise {currentIndex + 1} of {totalExercises}
          <button onClick={resetTimer} style={{ marginLeft: "10px" }}>
            Reset 🔄
          </button>
        </div>
      </main>
    </div>
  );
};

export default TimerCircle;
