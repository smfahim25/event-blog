import { Suspense } from "react";
import BlogGrid from "@/components/blog-grid";
import CategoryFilter from "@/components/category-filter";
// import FeaturedBlog from "@/components/featured-blog";
import { getBlogCategories, getBlogs } from "@/lib/api";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface SearchParams {
  page?: string;
  category?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number.parseInt(params.page || "1");
  const category = params.category;

  const [blogsData, categories] = await Promise.all([
    getBlogs(page, 12),
    getBlogCategories(),
  ]);

  const featuredBlog = blogsData.blogs[0];
  const otherBlogs = blogsData.blogs;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header Section */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <CategoryFilter categories={categories} currentCategory={category} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Blog Section */}
        {/* {featuredBlog && !category && page === 1 && (
          <div className="rounded-2xl mb-16 overflow-hidden">
            <FeaturedBlog blog={featuredBlog} />
          </div>
        )} */}

        {/* Blog Grid Section */}
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          }
        >
          <BlogGrid
            blogs={
              featuredBlog && !category && page === 1
                ? otherBlogs
                : blogsData.blogs
            }
            currentPage={page}
            totalPages={Math.ceil(blogsData.total / 12)}
            category={category}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
