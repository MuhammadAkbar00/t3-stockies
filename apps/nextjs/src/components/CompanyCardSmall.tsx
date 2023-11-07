import Image from "next/image";

interface IProps {
  company: {
    id: number;
    logo: string;
    name: string;
    ticker: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function CompanyCardSmall({ company }: IProps) {
  return (
    <div className="first: m-2 mt-0 flex flex-row justify-between rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-1 flex-col lg:flex-row">
        <Image
          src={company.logo}
          width={40}
          height={40}
          alt={`${company.name}-logo`}
          className="m-2 self-start"
        />
        <div>
          <p className="text-primary w-[200px] truncate text-2xl font-bold">
            {company.name}
          </p>
          <p className="text-base text-[#A7A7A7]">{company.ticker}</p>
        </div>
        <div className="ml-auto">
          <p className="text-right text-base text-[#222]">561,78 ₽</p>
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M4.66667 11.8333L11.3333 5.16663M11.3333 5.16663H4.66667M11.3333 5.16663V11.8333"
                stroke="#4DC43A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-light-green text-base">
              376,29 ₽ (0,49 %)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
