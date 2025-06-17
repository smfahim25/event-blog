import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Clock3, ArrowLeft, Calendar, Tag, BookOpen } from "lucide-react";
import Navbar from "@/components/navbar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);

    return {
      title: blog.title,
      description: blog.excerpt || blog.description,
      keywords: blog.tags?.join(", "),
      openGraph: {
        title: blog.title,
        description: blog.excerpt || blog.description,
        images: blog.featuredImage
          ? [
              {
                url: blog.featuredImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author?.name || "Team Retreat Guide"],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt || blog.description,
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "This article does not exist or is no longer available.",
    };
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
    const readingTime = calculateReadingTime(blog.content || "");

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <Navbar />

        <div className="relative">
          {blog.featuredImage && (
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
              <Image
                src={blog.featuredImage || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Navigation overlay */}
              <div className="absolute top-0 left-0 right-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-medium transition-all duration-200 rounded-full border border-white/20"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Articles
                  </Link>
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="max-w-5xl mx-auto px-4 pb-12">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock3 className="w-4 h-4" />
                        {readingTime} min read
                      </div>
                      {blog.category && (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                            {blog.category.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                      {blog.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!blog.featuredImage && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="max-w-6xl mx-auto px-4 py-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-medium transition-all duration-200 rounded-full border border-white/20 mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Articles
                </Link>
              </div>
              <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(blog.createdAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock3 className="w-4 h-4" />
                      {readingTime} min read
                    </div>
                    {blog.category && (
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                          {blog.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>

        <article className="relative -mt-8 z-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="border-b border-gray-100 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="w-5 h-5" />
                      <span className="font-medium">Article</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 md:px-12 py-6">
                <div className="blog-content">
                  <style>{`
                    .blog-content {
                      line-height: 1.8;
                      color: #374151;
                      font-size: 1.125rem;
                    }

                    .blog-content h1 {
                      font-size: 2.5rem;
                      font-weight: 800;
                      margin: 3rem 0 1.5rem 0;
                      color: #111827;
                      line-height: 1.2;
                      position: relative;
                      padding-bottom: 1rem;
                    }

                    .blog-content h1::after {
                      content: '';
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 60px;
                      height: 4px;
                      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                      border-radius: 2px;
                    }

                    .blog-content h2 {
                      font-size: 2rem;
                      font-weight: 700;
                      margin: 2.5rem 0 1rem 0;
                      color: #111827;
                      line-height: 1.3;
                      position: relative;
                      padding-left: 1rem;
                    }

                    .blog-content h2::before {
                      content: '';
                      position: absolute;
                      left: 0;
                      top: 0.5rem;
                      width: 4px;
                      height: 2rem;
                      background: linear-gradient(180deg, #3b82f6, #8b5cf6);
                      border-radius: 2px;
                    }

                    .blog-content h3 {
                      font-size: 1.5rem;
                      font-weight: 600;
                      margin: 2rem 0 0.75rem 0;
                      color: #111827;
                      line-height: 1.4;
                    }

                    .blog-content h4 {
                      font-size: 1.25rem;
                      font-weight: 600;
                      margin: 1.5rem 0 0.5rem 0;
                      color: #111827;
                    }

                    .blog-content h5 {
                      font-size: 1.125rem;
                      font-weight: 600;
                      margin: 1.25rem 0 0.5rem 0;
                      color: #111827;
                    }

                    .blog-content h6 {
                      font-size: 1rem;
                      font-weight: 600;
                      margin: 1rem 0 0.5rem 0;
                      color: #111827;
                    }

                    .blog-content p {
                      margin: 1.5rem 0;
                      line-height: 1.8;
                    }

                    .blog-content ul {
                      margin: 1.5rem 0;
                      padding-left: 0;
                      list-style: none;
                    }

                    .blog-content ul li {
                      position: relative;
                      padding-left: 2rem;
                      margin: 1rem 0;
                      line-height: 1.7;
                    }

                    .blog-content ul li::before {
                      content: '';
                      position: absolute;
                      left: 0.5rem;
                      top: 0.75rem;
                      width: 6px;
                      height: 6px;
                      background: #3b82f6;
                      border-radius: 50%;
                    }

                    .blog-content ol {
                      margin: 1.5rem 0;
                      padding-left: 2rem;
                      counter-reset: item;
                    }

                    .blog-content ol li {
                      margin: 1rem 0;
                      line-height: 1.7;
                      position: relative;
                      counter-increment: item;
                    }

                    .blog-content ol li::before {
                      content: counter(item);
                      position: absolute;
                      left: -2rem;
                      top: 0;
                      background: #3b82f6;
                      color: white;
                      width: 1.5rem;
                      height: 1.5rem;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 0.75rem;
                      font-weight: 600;
                    }

                    .blog-content a {
                      color: #3b82f6;
                      text-decoration: none;
                      font-weight: 500;
                      border-bottom: 2px solid transparent;
                      transition: all 0.2s ease;
                    }

                    .blog-content a:hover {
                      color: #1d4ed8;
                      border-bottom-color: #3b82f6;
                    }

                    .blog-content strong {
                      font-weight: 700;
                      color: #111827;
                    }

                    .blog-content em {
                      font-style: italic;
                      color: #6b7280;
                    }

                    .blog-content blockquote {
                      border: none;
                      margin: 2rem 0;
                      padding: 2rem;
                      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                      border-radius: 1rem;
                      position: relative;
                      font-style: italic;
                      font-size: 1.125rem;
                      color: #475569;
                      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }

                    .blog-content blockquote::before {
                      content: '"';
                      position: absolute;
                      top: -0.5rem;
                      left: 1rem;
                      font-size: 6rem;
                      color: #3b82f6;
                      opacity: 0.2;
                      font-family: serif;
                    }

                    .blog-content code {
                      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                      padding: 0.375rem 0.75rem;
                      border-radius: 0.5rem;
                      font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Courier New", monospace;
                      font-size: 0.875rem;
                      color: #dc2626;
                      border: 1px solid #e2e8f0;
                      font-weight: 500;
                    }

                    .blog-content pre {
                      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                      color: #f1f5f9;
                      padding: 2rem;
                      border-radius: 1rem;
                      margin: 2rem 0;
                      overflow-x: auto;
                      font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Courier New", monospace;
                      font-size: 0.875rem;
                      line-height: 1.7;
                      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
                      border: 1px solid #334155;
                    }

                    .blog-content pre code {
                      background: transparent;
                      padding: 0;
                      color: inherit;
                      border: none;
                    }

                    .blog-content img {
                      max-width: 100%;
                      height: auto;
                      margin: 3rem auto;
                      border-radius: 1rem;
                      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                      transition: all 0.3s ease;
                      display: block;
                    }

                    .blog-content img:hover {
                      transform: scale(1.02);
                      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                    }

                    .blog-content table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 2rem 0;
                      border-radius: 1rem;
                      overflow: hidden;
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                      background: white;
                    }

                    .blog-content th {
                      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                      padding: 1.25rem;
                      text-align: left;
                      font-weight: 600;
                      color: #374151;
                      border-bottom: 2px solid #e5e7eb;
                    }

                    .blog-content td {
                      padding: 1.25rem;
                      border-bottom: 1px solid #f1f5f9;
                    }

                    .blog-content tr:hover {
                      background-color: #f8fafc;
                    }

                    .blog-content hr {
                      margin: 4rem 0;
                      border: none;
                      height: 1px;
                      background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                    }

                    .blog-content iframe {
                      max-width: 100%;
                      margin: 2rem 0;
                      border-radius: 1rem;
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    }

                    .blog-content video {
                      max-width: 100%;
                      height: auto;
                      margin: 2rem 0;
                      border-radius: 1rem;
                      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    }

                    /* First paragraph styling */
                    .blog-content > p:first-child {
                      font-size: 1.25rem;
                      font-weight: 400;
                      color: #4b5563;
                      line-height: 1.8;
                      margin-bottom: 2rem;
                    }

                    /* Drop cap for first letter */
                    .blog-content > p:first-child::first-letter {
                      float: left;
                      font-size: 4rem;
                      line-height: 3rem;
                      padding-right: 0.5rem;
                      padding-top: 0.25rem;
                      font-weight: 700;
                      color: #3b82f6;
                    }
                  `}</style>

                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
              </div>

              {/* Article Footer */}
              <div className="border-t border-gray-100 px-8 md:px-12 py-8">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Published on {formatDate(blog.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Bottom spacing */}
        <div className="h-16"></div>
      </div>
    );
  } catch {
    notFound();
  }
}
