// convex/getUserPosts.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserPosts = query({
  args: { authorId: v.string() },
  handler: async (ctx, { authorId }) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", authorId))
      .order("desc")
      .collect();
  },
});
