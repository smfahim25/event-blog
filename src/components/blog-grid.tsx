import BlogCard from "./blog-card";
import Pagination from "./pagination";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content?: string;
  description: string;
  featuredImage?: string;
  createdAt: string;
  category?: {
    name: string;
    slug: string;
  };
}

interface BlogGridProps {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function BlogGrid({
  blogs,
  currentPage,
  totalPages,
  category,
}: BlogGridProps) {
  return (
    <div className="space-y-12">
      <div className="flex flex-wrap  gap-8 items-center justify-center md:justify-start">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
          />
        </div>
      )}
    </div>
  );
}
