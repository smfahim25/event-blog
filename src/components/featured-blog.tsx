import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

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

interface FeaturedBlogProps {
  blog: Blog;
}

const extractTextFromHTML = (
  htmlContent: string | undefined,
  maxLength = 300
) => {
  if (!htmlContent) return "";

  const textContent = htmlContent
    .replace(/<img[^>]*>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<video[^>]*>[\s\S]*?<\/video>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (textContent.length <= maxLength) {
    return textContent;
  }

  const truncated = textContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }

  return truncated + "...";
};

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block">
      <article className="transition rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/2] relative bg-gray-100 rounded-xl overflow-hidden shadow-lg group">
              <Image
                src={
                  blog.featuredImage ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-okRYPqaS9ibJoKnKEl3ajPkt5xeli5.png"
                }
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
              {blog.title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              {extractTextFromHTML(blog.content) || blog.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={blog.createdAt} className="font-medium">
                {formatDate(blog.createdAt)}
              </time>
              {blog.category && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {blog.category.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
