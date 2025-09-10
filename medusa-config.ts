import { loadEnv, defineConfig } from "@medusajs/framework/utils"
loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL as string,
    redisUrl: process.env.REDIS_URL,
    http: {
      // host: "0.0.0.0",  // CRITICAL FOR DOCKER!
      // port: parseInt(process.env.PORT || "9000"),
      storeCors: process.env.STORE_CORS ?? "",
      adminCors: process.env.ADMIN_CORS ?? "",
      authCors: process.env.AUTH_CORS ?? "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://site-studio-v2-production.up.railway.app",  // FIXED!
    path: (process.env.ADMIN_PATH || "/app") as `/${string}`,
    disable: ((process.env.ADMIN_DISABLED ?? process.env.DISABLE_MEDUSA_ADMIN ?? "").toLowerCase() === "true"),
  },
})