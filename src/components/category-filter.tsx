"use client";

import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  currentCategory?: string;
}

// English category mappings
const categoryTranslations: { [key: string]: string } = {
  tous: "All",
  "future-of-work": "Future of Work",
  guides: "Guides",
  seminaires: "Seminars",
  "team-building": "Team Building",
  "temoignages-clients": "Client Stories",
};

export default function CategoryFilter({
  categories,
  currentCategory,
}: CategoryFilterProps) {
  const allCategories = [
    { _id: "all", name: "All", slug: "" },
    ...categories.map((cat) => ({
      ...cat,
      name: categoryTranslations[cat.slug] || cat.name,
    })),
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
      {allCategories.map((category) => {
        const isActive =
          currentCategory === category.slug ||
          (!currentCategory && category.slug === "");

        return (
          <Link
            key={category._id}
            href={category.slug ? `/?category=${category.slug}` : "/"}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 rounded-full border ${
              isActive
                ? "bg-gray-900 text-white border-gray-900 shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
