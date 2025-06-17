/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "https://api.lessortiesdediane.com/api/v1";

interface BlogsResponse {
  blogs: any[];
  total: number;
  page: number;
  limit: number;
}

export async function getBlogs(page = 1, limit = 12): Promise<BlogsResponse> {
  try {
    const url = `${API_URL}/blogs?page=${page}&limit=${limit}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();
    return {
      blogs: data.blogs || [],
      total: data.total || data.blogs?.length || 0,
      page: data.page || page,
      limit: data.limit || limit,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      blogs: [],
      total: 0,
      page,
      limit,
    };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/blogs/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();
    return data.blog || data.data || data;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
}

export async function getBlogCategories() {
  try {
    const response = await fetch(`${API_URL}/blog-categories/`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    return data.categories || data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
