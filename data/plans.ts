import { WorkoutDay } from "@/types/workout";

export const plans: Record<string, WorkoutDay[]> = {
  beginner: [
    {
      day: "Monday",
      title: "Push",
      type: "push",
      exercises: [
        { name: "Push-ups", sets: 3, reps: 12 },
        { name: "Incline Push-ups", sets: 3, reps: 10 },
        { name: "Knee Push-ups", sets: 3, reps: 15 },
        { name: "Wide Grip Push-ups", sets: 3, reps: 10 },
        { name: "Diamond Push-ups (on knees)", sets: 3, reps: 8 },
        { name: "Wall Push-ups", sets: 3, reps: 20 },
      ],
    },
    {
      day: "Tuesday",
      title: "Rest",
      type: "rest",
      exercises: [],
    },
    {
      day: "Wednesday",
      title: "Pull",
      type: "pull",
      exercises: [
        { name: "Pull-ups", sets: 3, reps: 8 },
        { name: "Rows", sets: 3, reps: 12 },
      ],
    },
    {
      day: "Thursday",
      title: "Rest",
      type: "rest",
      exercises: [],
    },
    {
      day: "Friday",
      title: "Legs",
      type: "legs",
      exercises: [
        { name: "Squats", sets: 4, reps: 12 },
        { name: "Lunges", sets: 3, reps: 10 },
      ],
    },
    {
      day: "Saturday",
      title: "Rest",
      type: "rest",
      exercises: [],
    },
    {
      day: "Sunday",
      title: "Cardio",
      type: "cardio",
      exercises: [{ name: "Running", sets: 1, reps: 20 }],
    },
  ],

  progressive_beginner: [
    {
      day: "Monday",
      title: "Push Strength",
      type: "push",
      exercises: [
        { name: "Standard Push-ups", sets: 3, reps: 8 },
        { name: "Decline Push-ups", sets: 3, reps: 8 },
        { name: "Diamond Push-ups", sets: 3, reps: 8 },
        { name: "Pike Push-ups", sets: 3, reps: 8 },
        { name: "Archer Push-ups", sets: 3, reps: 8 },
      ],
    },
    { day: "Tuesday", title: "Active Rest", type: "rest", exercises: [] },
    {
      day: "Wednesday",
      title: "Pull Strength",
      type: "pull",
      exercises: [
        { name: "Pull-ups", sets: 4, reps: 10 },
        { name: "Chin-ups", sets: 4, reps: 8 },
        { name: "Australian Rows", sets: 4, reps: 12 },
        { name: "Negative Pull-ups", sets: 3, reps: 6 },
      ],
    },
    { day: "Thursday", title: "Rest", type: "rest", exercises: [] },
    {
      day: "Friday",
      title: "Legs",
      type: "legs",
      exercises: [
        { name: "Pistol Squat Progression", sets: 3, reps: 6 },
        { name: "Jump Squats", sets: 4, reps: 12 },
        { name: "Bulgarian Split Squats", sets: 3, reps: 10 },
        { name: "Calf Raises", sets: 4, reps: 20 },
      ],
    },
    { day: "Saturday", title: "Conditioning", type: "cardio", exercises: [] },
    {
      day: "Sunday",
      title: "Core + Mobility",
      type: "cardio",
      exercises: [
        { name: "Plank", sets: 3, reps: 60 },
        { name: "Leg Raises", sets: 3, reps: 12 },
        { name: "Hollow Body Hold", sets: 3, reps: 30 },
      ],
    },
  ],

  intermediate: [
    {
      day: "Monday",
      title: "Push Strength",
      type: "push",
      exercises: [
        { name: "Standard Push-ups", sets: 4, reps: 15 },
        { name: "Decline Push-ups", sets: 4, reps: 12 },
        { name: "Diamond Push-ups", sets: 4, reps: 10 },
        { name: "Dips", sets: 4, reps: 10 },
        { name: "Pseudo Planche Lean", sets: 3, reps: 20 },
      ],
    },
    { day: "Tuesday", title: "Active Rest", type: "rest", exercises: [] },
    {
      day: "Wednesday",
      title: "Pull Strength",
      type: "pull",
      exercises: [
        { name: "Pull-ups", sets: 4, reps: 10 },
        { name: "Chin-ups", sets: 4, reps: 8 },
        { name: "Australian Rows", sets: 4, reps: 12 },
        { name: "Negative Pull-ups", sets: 3, reps: 6 },
      ],
    },
    { day: "Thursday", title: "Rest", type: "rest", exercises: [] },
    {
      day: "Friday",
      title: "Leg Strength",
      type: "legs",
      exercises: [
        { name: "Bulgarian Split Squats", sets: 3, reps: 10 },
        { name: "Jump Squats", sets: 4, reps: 12 },
        { name: "Pistol Squat Progression", sets: 3, reps: 6 },
        { name: "Calf Raises", sets: 4, reps: 20 },
      ],
    },
    { day: "Saturday", title: "Conditioning", type: "cardio", exercises: [] },
    {
      day: "Sunday",
      title: "Core + Mobility",
      type: "cardio",
      exercises: [
        { name: "Plank", sets: 3, reps: 60 },
        { name: "Hollow Body Hold", sets: 3, reps: 30 },
        { name: "Leg Raises", sets: 3, reps: 12 },
      ],
    },
  ],

  advanced: [
    {
      day: "Monday",
      title: "Push Power",
      type: "push",
      exercises: [
        { name: "Archer Push-ups", sets: 4, reps: 10 },
        { name: "One Arm Push-up Progression", sets: 4, reps: 5 },
        { name: "Ring Dips", sets: 4, reps: 8 },
        { name: "Pseudo Planche Push-ups", sets: 4, reps: 10 },
        { name: "Clap Push-ups", sets: 3, reps: 12 },
      ],
    },
    { day: "Tuesday", title: "Recovery", type: "rest", exercises: [] },
    {
      day: "Wednesday",
      title: "Pull Power",
      type: "pull",
      exercises: [
        { name: "Weighted Pull-ups", sets: 4, reps: 6 },
        { name: "Muscle-up Progressions", sets: 4, reps: 5 },
        { name: "Archer Pull-ups", sets: 3, reps: 6 },
        { name: "Front Lever Holds", sets: 4, reps: 10 },
      ],
    },
    { day: "Thursday", title: "Rest", type: "rest", exercises: [] },
    {
      day: "Friday",
      title: "Leg Power",
      type: "legs",
      exercises: [
        { name: "Pistol Squats", sets: 4, reps: 8 },
        { name: "Nordic Curls", sets: 3, reps: 6 },
        { name: "Jump Lunges", sets: 4, reps: 12 },
        { name: "Wall Sit (weighted)", sets: 3, reps: 60 },
      ],
    },
    {
      day: "Saturday",
      title: "Skill + Conditioning",
      type: "cardio",
      exercises: [
        { name: "Handstand Practice", sets: 5, reps: 30 },
        { name: "Burpees", sets: 4, reps: 15 },
        { name: "Sprint Intervals", sets: 6, reps: 30 },
      ],
    },
    {
      day: "Sunday",
      title: "Core Mastery",
      type: "cardio",
      exercises: [
        { name: "L-Sit Hold", sets: 4, reps: 20 },
        { name: "Dragon Flags", sets: 3, reps: 8 },
        { name: "Hanging Leg Raises", sets: 4, reps: 12 },
      ],
    },
  ],
};
