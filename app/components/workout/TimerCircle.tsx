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
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="absolute top-1 p-4">
        <svg className="w-full h-2">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="6"
            className="fill-[#2D2D2D]"
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
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="  text-center px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            {currentExercise.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Set {currentSet} of {currentExercise.sets} • {currentExercise.reps}{" "}
            Reps
          </p>
        </div>
        {/* Progress bar */}

        <div className="relative flex items-center justify-center">
          {/* SVG Circle */}
          <svg
            viewBox="0 0 500 500"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-400px md:h-400px -rotate-90"
          >
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

          {/* Time */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-3xl sm:text-5xl md:text-6xl font-bold">
            {formatTime(timeLeft)}
          </div>

          {/* REST label */}
          {isRunning && (
            <div className="absolute bottom-6 sm:bottom-10 text-[#22C55E] text-sm sm:text-lg font-medium">
              REST
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={toggleTimer}
            className="text-2xl sm:text-3xl p-5 sm:p-8 rounded-full bg-[#22C55E] flex items-center justify-center"
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Footer info */}
        <div className="flex flex-col items-center justify-center text-center w-full pt-6 text-sm sm:text-base">
          Exercise {currentIndex + 1} of {totalExercises}
          <button
            onClick={resetTimer}
            className="mt-2 text-green-400 underline"
          >
            Reset 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerCircle;
