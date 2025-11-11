// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
  }).index("by_uid", ["uid"]),
  posts: defineTable({
    authorId: v.string(),
    authorName: v.string(),
    text: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_author", ["authorId"]),
});
