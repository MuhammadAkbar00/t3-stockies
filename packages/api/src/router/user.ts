import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({ where: { id: input } });
  }),
  // create: protectedProcedure
  //   .input(z.object({ title: z.number(), content: z.string() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.company.create({ data: input });
  //   }),
});
