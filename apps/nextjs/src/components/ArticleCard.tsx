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
    publish_date: Date | null;
    s_negative: Prisma.Decimal;
    s_neutral: Prisma.Decimal;
    s_positive: Prisma.Decimal;
    sentiment: string;
    source_id: string;
    title: string;
    updatedAt: Date;
    video_url: string | null;
  };
}

export default function ArticleCard({ article }: IProps) {
  function timeAgo(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks >= 2) {
      return `${weeks}w ago`;
    } else if (days >= 1) {
      return `${days}d ago`;
    } else if (hours >= 1) {
      return `${hours}h ago`;
    } else if (minutes >= 1) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }

  function handleDate(publish_date: Date | null) {
    return publish_date ? timeAgo(publish_date) : "";
  }

  return (
    <div className="grid grid-cols-2 bg-white shadow-md">
      <div>
        <Image
          src={
            "https://media.architecturaldigest.com/photos/5ab53b6e2ed63a101d561e70/16:9/w_1920,c_limit/Tout-Hamburg.jpg"
          }
          width="0"
          height="0"
          sizes="100vw"
          alt={`$sakurablossom-logo`}
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-around p-2">
        <span className="text-[#BFBFBF]">
          {article.sentiment} - {handleDate(article.publish_date)}
        </span>
        <div className="text-base font-medium">{article.title}</div>
        <div className="text-[#666666]">
          Volutpat tellus porta felis, accumsan. Praesent quis amet et
          scelerisque dictum fringilla id.
        </div>
      </div>
    </div>
  );
}
