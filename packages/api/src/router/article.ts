import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const articleRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.article.findFirst({ where: { id: input } });
  }),
  byCompanyId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.article.findMany({ where: { company_id: input } });
  }),
  // create: protectedProcedure
  //   .input(z.object({ title: z.number(), content: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.article.create({ data: input });
  //   }),
});
