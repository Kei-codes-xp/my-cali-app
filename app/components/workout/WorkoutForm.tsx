"use client";

import { useState } from "react";
import { createWorkout } from "@/lib/firestore";
import { auth } from "@/lib/firebase";

const WorkoutForm = () => {
  //   const [name, setName] = useState("");
  //   const userId = auth.currentUser?.uid;
  //   const handleCreate = async () => {
  //     await createWorkout(userId, name);
  //     alert("Workout created!");
  //   };
  //   return (
  //     <div>
  //       <input
  //         placeholder="Workout name (Push Day)"
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //       <button onClick={handleCreate}>Create Workout</button>
  //     </div>
  //   );
};

export default WorkoutForm;
