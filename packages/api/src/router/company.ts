import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const companyRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.findMany();
  }),
  byId: publicProcedure.input(z.number().nullable()).query(({ ctx, input }) => {
    if (!input) {
      return null;
    }
    return ctx.prisma.company.findFirst({ where: { id: input } });
  }),
});
