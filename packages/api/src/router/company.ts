import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const companyRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.findMany();
  }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.company.findFirst({ where: { id: input } });
  }),
  // create: protectedProcedure
  //   .input(z.object({ title: z.number(), content: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.company.create({ data: input });
  //   }),
});
