// convex/functions/getPosts.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export default query({
  args: { authorId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
      .order("desc")
      .collect();
  },
});
