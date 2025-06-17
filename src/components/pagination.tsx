import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  category,
}: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (category) params.set("category", category);

    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
        >
          Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            1
          </Link>
          {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-3 py-2 rounded-full transition-all duration-200 ${
            page === currentPage
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <Link
            href={getPageUrl(totalPages)}
            className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
