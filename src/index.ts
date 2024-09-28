import "dotenv/config";
import flight from "@/graphql/server/server";
import { gracefulShutdown } from "@/graphql/server/shutdown";

// Handle cleanup
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Server
flight();
