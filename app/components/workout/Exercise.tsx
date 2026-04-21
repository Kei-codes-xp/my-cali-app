"use client";

import { useState } from "react";
import { addExercise } from "@/lib/firestore";

export default function AddExercise() {
  const [form, setForm] = useState({
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });

  const userId = "demoUser";
  const workoutId = "yourWorkoutId"; // replace later

  const handleAdd = async () => {
    await addExercise(userId, workoutId, form);
    alert("Exercise added!");
  };

  return (
    <div>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Sets"
        type="number"
        onChange={(e) => setForm({ ...form, sets: +e.target.value })}
      />

      <input
        placeholder="Reps"
        type="number"
        onChange={(e) => setForm({ ...form, reps: +e.target.value })}
      />

      <input
        placeholder="Rest"
        type="number"
        onChange={(e) => setForm({ ...form, rest: +e.target.value })}
      />

      <button onClick={handleAdd}>Add Exercise</button>
    </div>
  );
}
