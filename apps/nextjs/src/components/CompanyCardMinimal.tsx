import Image from "next/image";
import Link from "next/link";

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

export default function CompanyCardMinimal({ company }: IProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <div className="transform rounded-lg bg-white p-4 shadow-md transition duration-300 hover:scale-105">
        <div className="flex">
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
        </div>
      </div>
    </Link>
  );
}
