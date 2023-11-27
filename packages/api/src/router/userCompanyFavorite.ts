import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userCompanyFavoriteRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user_Company_Favorite.findMany({
      include: {
        user_company: true,
      },
    });
  }),
  byUserAndCompanyId: publicProcedure
    .input(
      z.object({
        user_id: z.string().nullable(),
        user_company_favorite_id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      if (!input.user_id || !input.user_company_favorite_id) {
        return {};
      }
      return ctx.prisma.user_Company_Favorite.findFirst({
        where: {
          user_id: input.user_id,
          user_company_favorite_id: input.user_company_favorite_id,
        },
        include: {
          user_company: true,
        },
      });
    }),
  byUserId: publicProcedure
    .input(z.string().nullable())
    .query(({ ctx, input }) => {
      if (!input) {
        return [];
      }
      return ctx.prisma.user_Company_Favorite.findMany({
        where: {
          user_id: input,
        },
        include: {
          user_company: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({ user_id: z.string(), user_company_favorite_id: z.number() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user_Company_Favorite.create({ data: input });
    }),

  delete: publicProcedure
    .input(
      z.object({ user_id: z.string(), user_company_favorite_id: z.number() }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user_Company_Favorite.deleteMany({
        where: {
          user_id: input.user_id,
          user_company_favorite_id: input.user_company_favorite_id,
        },
      });
    }),
});
