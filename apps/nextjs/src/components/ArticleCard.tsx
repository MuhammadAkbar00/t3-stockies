import Image from "next/image";

interface IProps {
  article: {
    // categories: string[];
    // company_id: number;
    // content: string;
    // countries: string[];
    // createdAt: Date;
    // description: string;
    // id: number;
    // image_url: string;
    // keywords: string[];
    // language: string;
    // link: string;
    // publish_date: Date;
    // s_negative: number;
    // s_neutral: number;
    // s_positive: number;
    // sentiment: string;
    // source_id: string;
    // title: string;
    // updatedAt: Date;
    // video_url: string;
  };
}

export default function ArticleCard({ article }: IProps) {
  return (
    //height-[180px] w-[580px]
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
        <span className="text-[#BFBFBF]">18h ago</span>
        <div className="text-base font-medium">
          Morbi habitasse felis nulla arcu, morbi ultricies.
        </div>
        <div className="text-[#666666]">
          Volutpat tellus porta felis, accumsan. Praesent quis amet et
          scelerisque dictum fringilla id.
        </div>
        <div>hehe</div>
      </div>
    </div>
  );
}
