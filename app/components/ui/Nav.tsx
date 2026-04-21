"use client";
import {
  FaHome,
  FaDumbbell,
  FaFire,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import NavItem from "./NavItem";

export default function Sidebar() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <>
      <div className="hidden sm:flex group fixed left-0 top-0 h-screen w-16 hover:w-56 bg-black text-white transition-all duration-300 flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <span className="text-green-500 font-bold">CF</span>
        </div>

        <div className="flex-1 flex flex-col gap-2 mt-4">
          <NavItem icon={<FaHome />} label="Home" path="/home" />
          <NavItem icon={<FaDumbbell />} label="Workout" path="/workout" />
          <NavItem icon={<FaFire />} label="Progress" path="/progress" />
          <NavItem icon={<FaUser />} label="Profile" path="/profile" />
        </div>

        <div className="border-t border-gray-800 p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 hover:bg-gray-900 rounded"
          >
            <FaSignOutAlt />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              Logout
            </span>
          </button>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-black text-white border-t border-gray-800 flex justify-evenly p-2">
        <NavItem icon={<FaHome />} label="Home" path="/home" />
        <NavItem icon={<FaDumbbell />} label="Workout" path="/workout" />
        <NavItem icon={<FaFire />} label="Progress" path="/progress" />
        <NavItem icon={<FaUser />} label="Profile" path="/profile" />
      </div>
    </>
  );
}
