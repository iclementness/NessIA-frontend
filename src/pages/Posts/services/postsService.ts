import { Post } from "../entities/PostTypes";
import { db } from "../../../shared/services/db";

const mapPost = (data: any): Post => {
  return {
    id: data.id,
    title: data.title,
    description: data.content_text || "Pas de contenu.",
    status: data.status,
    platform: data.platform?.name || "Instagram",
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    publishedAt: data.published_at ? new Date(data.published_at) : undefined,
    imageUrl: data.media?.[0]?.url || "",
    userId: data.user_id,
    conversationId: data.session?.[0]?.id || "",
  };
};

export class PostsService {
  static async fetchUserPosts(): Promise<Post[]> {
    // Simulate API call delay
    const posts = await db.getAllPosts();
    const mappedPosts = posts.map(mapPost);

    // For demo purposes, always return mock data regardless of userId
    // In real app, this would filter by actual userId
    return mappedPosts.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}
