import { router } from "../trpc";
import { companyRouter } from "./company";
import { userCompanyFavoriteRouter } from "./userCompanyFavorite";
import { authRouter } from "./auth";
import { articleRouter } from "./article";
import { userRouter } from "./user";

export const appRouter = router({
  company: companyRouter,
  userCompanyFavorite: userCompanyFavoriteRouter,
  article: articleRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
