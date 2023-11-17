import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const articleRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.article.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.article.findFirst({ where: { id: input } });
  }),
  byCompanyId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.article.findMany({ where: { company_id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        company_id: z.number(),
        title: z.string(),
        link: z.string(),
        keywords: z.array(z.string()),
        video_url: z.string(),
        description: z.string(),
        content: z.string(),
        publish_date: z.date(),
        image_url: z.string(),
        source_id: z.string(),
        countries: z.array(z.string()),
        categories: z.array(z.string()),
        language: z.string(),
        sentiment: z.string(),
        s_positive: z.number(),
        s_negative: z.number(),
        s_neutral: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.article.create({ data: input });
    }),
});
