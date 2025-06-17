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

interface BlogCardProps {
  blog: Blog;
}

const extractTextFromHTML = (
  htmlContent: string | undefined,
  maxLength = 150
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

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="w-[300px] h-[480px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden flex-shrink-0">
          <Image
            src={
              blog.featuredImage ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7JQWUyjmbql3GLcnpdLoeffHuut9hd.png"
            }
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="px-4 py-3 flex flex-col flex-grow">
        <Link href={`/blog/${blog.slug}`} className="block mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
            {blog.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-2">
          {extractTextFromHTML(blog.content) || blog.description}
        </p>

        <div className="flex items-center justify-between pt-2 mt-auto">
          <time
            dateTime={blog.createdAt}
            className="text-xs text-gray-500 font-medium"
          >
            {formatDate(blog.createdAt)}
          </time>
          {blog.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              {blog.category.name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
