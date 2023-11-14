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

export default function ArticleCardSmall({ article }: IProps) {
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
        src={
          article.image_url ||
          "https://media.istockphoto.com/id/1202205418/photo/find-the-shortest-path-between-points-a-and-b.jpg?s=612x612&w=0&k=20&c=_0PSqcLbxAHx8eb_vFzDuKpKtlvZmxj1XbwZ61iwE0s="
        }
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <p className="text-base text-[#A7A7A7]">
          {article.sentiment} - {handleDate(article.publish_date)}
        </p>
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
