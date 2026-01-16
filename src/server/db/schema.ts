import { index, pgTableCreator, pgTable, text } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `${name}`);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
});

export const tasks = createTable(
  "task",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.text().notNull().references(() => user.id, { onDelete: "cascade" }),
    name: d.varchar({ length: 256 }).notNull(),
    completed: d.boolean().notNull().default(false),
    date: d.timestamp({ withTimezone: true }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("task_userId_idx").on(t.userId),
    index("task_completed_idx").on(t.completed),
  ],
);
