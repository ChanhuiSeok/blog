import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const isRemote = url.startsWith("libsql://");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: isRemote ? "turso" : "sqlite",
  dbCredentials: {
    url,
    ...(isRemote && { authToken: process.env.TURSO_AUTH_TOKEN }),
  },
});
