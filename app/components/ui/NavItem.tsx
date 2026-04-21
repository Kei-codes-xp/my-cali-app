"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type NavItemProps = {
  icon: ReactNode;
  label: string;
  path: string;
};

export default function NavItem({ icon, label, path }: NavItemProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => path && router.push(path)}
      className="flex items-center gap-3 w-full p-3 hover:bg-gray-900 rounded"
    >
      <span className="text-xl">{icon}</span>

      {/* hidden until hover */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}
