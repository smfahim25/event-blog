import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-lg border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo/Name */}
          <div className="flex items-center">
            <Link
              href="https://lessortiesdediane.com/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900  transition-colors duration-200 group"
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
