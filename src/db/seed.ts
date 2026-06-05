import "dotenv/config";
import "dotenv-expand/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";
import * as schema from "@/db/schema";
import { auth } from "@/lib/auth";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);

  await auth.api.signUpEmail({
    body: {
      name: "QA User",
      email: "qa@example.com",
      password: "password",
    },
  });
  await seed(db, schema);
}

main();
