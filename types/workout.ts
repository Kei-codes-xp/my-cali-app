export type Exercise = {
  name: string;
  sets: number;
  reps: number;
};

export type WorkoutDay = {
  id?: string;
  day: string;
  title: string;
  type: string;
  exercises: Exercise[];
};

export type Workout = {
  name: string;
  sets: number;
  reps: number;
  completedSets: number;
};
