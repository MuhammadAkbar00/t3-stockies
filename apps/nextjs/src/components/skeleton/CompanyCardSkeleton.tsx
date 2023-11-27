export default function CompanyCardSkeleton() {
  return (
    <div className="relative m-2 mt-0 flex animate-pulse flex-row justify-between rounded-lg bg-white p-6">
      <div className="flex flex-col gap-3 lg:gap-12">
        <div className="flex flex-row">
          <svg
            className="m-2 h-14 w-14 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
          <div className="pt-2 pl-4">
            <div className="mb-2.5 h-2 w-24 max-w-[480px] rounded-full bg-gray-200 "></div>
            <div className="mb-2.5 h-2 w-24 max-w-[480px] rounded-full bg-gray-200 "></div>
          </div>
        </div>
        <div>
          <div className="mb-2.5 h-2 w-24 max-w-[480px] rounded-full bg-gray-200 "></div>
          <div className="flex gap-3">
            <div className="mb-2.5 h-2 w-12 max-w-[480px] rounded-full bg-gray-200 "></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end gap-8">
        <div className="font-lato h-10 w-24 rounded-lg bg-gray-200 p-2 px-8 py-3 text-white"></div>
      </div>
    </div>
  );
}
