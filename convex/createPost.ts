// convex/functions/createPost.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    authorId: v.string(),
    authorName: v.string(),
    text: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
