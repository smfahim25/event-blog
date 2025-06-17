"use client";
import { getSettings } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type Settings = {
  navbarColor?: string;
};

export default function Navbar() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    fetchSettings();
  }, []);
  return (
    <nav
      className="shadow-lg sticky top-0 z-50 backdrop-blur-sm "
      style={{ backgroundColor: settings?.navbarColor || "#1e8489" }}
    >
      <div className="mx-auto px-10">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo/Name */}
          <div className="flex items-center">
            <Link
              href="https://lessortiesdediane.com/"
              className="flex items-center gap-2 text-xl md:text-2xl xl:text-[28px] transition-colors duration-200 group"
            >
              <span>Les Sorties de Diane</span>
            </Link>
          </div>

          {/* Navigation Links (optional) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
