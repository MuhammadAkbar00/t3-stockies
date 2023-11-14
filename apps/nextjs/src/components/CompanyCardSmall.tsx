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
        <div className="ml-auto"></div>
      </div>
    </div>
  );
}
