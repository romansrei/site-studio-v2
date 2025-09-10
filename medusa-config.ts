import { loadEnv, defineConfig } from "@medusajs/framework/utils"
loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL as string,
    databaseDriverOptions: { ssl: { rejectUnauthorized: false } },
    redisUrl: process.env.REDIS_URL, // optional; safe when undefined
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: { path: "/admin" },
})
