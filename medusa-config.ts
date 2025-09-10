import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    // required in prod; cast to satisfy TS
    databaseUrl: process.env.DATABASE_URL as string,

    // optional; fine if unset for now (you’ll add Redis later)
    redisUrl: process.env.REDIS_URL,

    http: {
      // Medusa expects strings (comma-separated if multiple)
      // Using ?? "" prevents TS “possibly undefined” warnings
      storeCors: process.env.STORE_CORS ?? "",
      adminCors: process.env.ADMIN_CORS ?? "",
      authCors: process.env.AUTH_CORS ?? "",

      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    path: (process.env.ADMIN_PATH || "/app") as `/${string}`,
    // accept either env name; compare case-insensitively
    disable:
      ((process.env.ADMIN_DISABLED ?? process.env.DISABLE_MEDUSA_ADMIN ?? "")
        .toLowerCase() === "true"),
  },
})
