import { Prisma } from "@acme/db";
import Image from "next/image";

interface IProps {
  article: {
    categories: string[];
    company_id: number;
    content: string;
    countries: string[];
    createdAt: Date;
    description: string;
    id: number;
    image_url: string | null;
    keywords: string[];
    language: string;
    link: string;
    publish_date: Date;
    s_negative: Prisma.Decimal;
    s_neutral: Prisma.Decimal;
    s_positive: Prisma.Decimal;
    sentiment: string;
    source_id: string;
    title: string;
    updatedAt: Date;
    video_url: string;
  };
}

export default function ArticleCardSmall({ article }: IProps) {
  console.log(article);
  return (
    <a
      href={`/articles/${article.id}`}
      className="flex min-h-[258px] flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row"
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-full rounded-l-lg object-cover md:h-full md:w-48"
        // src="https://media.architecturaldigest.com/photos/5ab53b6e2ed63a101d561e70/16:9/w_1920,c_limit/Tout-Hamburg.jpg"
        src={
          article.image_url ||
          "https://media.architecturaldigest.com/photos/5ab53b6e2ed63a101d561e70/16:9/w_1920,c_limit/Tout-Hamburg.jpg"
        }
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <p className="text-base text-[#A7A7A7]">{article.sentiment}</p>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          {article.title}
        </h5>
        <p className="line-clamp-4 mb-3 font-normal text-gray-700 ">
          {article.description}
        </p>
      </div>
    </a>
  );
}
