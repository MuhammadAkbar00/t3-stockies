import { router } from "../trpc";
import { companyRouter } from "./company";
import { authRouter } from "./auth";
import { articleRouter } from "./article";

export const appRouter = router({
  company: companyRouter,
  article: articleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
