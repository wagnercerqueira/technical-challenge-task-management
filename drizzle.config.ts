import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./src/server/db/migrations",
  // Exclude "user" table from migrations (managed by better-auth)
  tablesFilter: ["task"],
} satisfies Config;
