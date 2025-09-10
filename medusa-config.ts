import { loadEnv, defineConfig } from "@medusajs/framework/utils"
loadEnv(process.env.NODE_ENV || "development", process.cwd())

// helper to combine comma lists safely
const joinCors = (...vals: (string | undefined)[]) =>
  vals.filter(Boolean).join(",")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
      .join(",")

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL as string,
    // fine for Railway PG; if you add ?sslmode=require to DATABASE_URL you can remove this
    databaseDriverOptions: { ssl: { rejectUnauthorized: false } },

    // optional; safe when undefined (you'll see "fake redis" until you add one)
    redisUrl: process.env.REDIS_URL,

    http: {
      // CORS values as comma-separated strings
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      // REQUIRED by types — use AUTH_CORS if set, else union of admin+store
      authCors: process.env.AUTH_CORS || joinCors(process.env.ADMIN_CORS, process.env.STORE_CORS),

      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      // host/port come from your Start command in Railway
    },
  },

  // bundled admin at /admin
  admin: { path: "/admin" },
})
