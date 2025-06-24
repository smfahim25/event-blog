"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Qwigley } from "next/font/google";
import { getSettings } from "@/lib/api";

const qwigley = Qwigley({
  weight: "400",
  subsets: ["vietnamese"],
  variable: "--font-qwigley",
});

type Settings = {
  navbarColor?: string;
};

const Footer: React.FC = () => {
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
    <footer
      className=" text-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: settings?.navbarColor || "#e88e2f" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <h1
              className={`text-xl sm:text-2xl lg:text-4xl font-bold text-black leading-tight ${qwigley.variable}`}
            >
              Les sorties de Diane
            </h1>
            <p className="text-sm sm:text-base text-black mt-2 max-w-xs">
              Your Gateway to Events
            </p>
          </div>

          <div className="w-full lg:flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-sm sm:text-base">
              <div>
                <h2 className="text-black font-semibold mb-3 text-base sm:text-lg">
                  Quick Links
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://lessortiesdediane.com"
                      className="text-black transition-colors duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://lessortiesdediane.com/app/events"
                      className="text-black transition-colors duration-200"
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blog.lessortiesdediane.com"
                      className="text-black transition-colors duration-200"
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://lessortiesdediane.com/contact-us"
                      className="text-black transition-colors duration-200"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-black font-semibold mb-3 text-base sm:text-lg">
                  User Links
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://lessortiesdediane.com/app/profile"
                      className="text-black transition-colors duration-200"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://lessortiesdediane.com/app/my-tickets"
                      className="text-black transition-colors duration-200"
                    >
                      Tickets
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h2 className="text-black font-semibold mb-3 text-base sm:text-lg">
                  Legal
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://lessortiesdediane.com/privacy"
                      className="text-black transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://lessortiesdediane.com/terms"
                      className="text-black transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto lg:flex-shrink-0 lg:min-w-[280px]">
            {/* Social Media */}
            <div className="mb-6">
              <h3 className="text-black font-semibold mb-3 text-base sm:text-lg">
                Follow Us
              </h3>
              <div className="flex gap-4 sm:gap-6">
                <a
                  href="#"
                  className="text-black hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-black hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-black hover:text-white transition-colors duration-200 text-sm sm:text-base"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 sm:mt-10 lg:mt-12 pt-6 text-center">
          <p className="text-xs sm:text-sm lg:text-base text-black">
            © {new Date().getFullYear()} Les sorties de Diane. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
