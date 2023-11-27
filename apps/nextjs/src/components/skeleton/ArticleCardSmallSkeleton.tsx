export default function ArticleCardSmallSkeleton() {
  return (
    <a className="flex min-h-[258px] animate-pulse flex-col items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 lg:max-w-xl lg:flex-row">
      <div className="flex h-full w-full items-center justify-center rounded-l-lg bg-gray-300 object-cover lg:h-full lg:w-48">
        <svg
          className="h-10 w-10 text-gray-200 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="mb-2.5 h-2 max-w-[100px] rounded-full bg-gray-200 "></div>
        <div className="mb-2.5 h-2 max-w-[100px] rounded-full  "></div>

        <div className="mb-4 h-2.5 w-60 rounded-full bg-gray-200 "></div>
        <div className="mb-4 h-2.5 w-60 rounded-full bg-gray-200 "></div>
        <div className="mb-4 h-2.5 w-60 rounded-full bg-gray-200 "></div>

        <div className="mb-2.5 h-2 rounded-full "></div>
        <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 "></div>
        <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
        <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
      </div>
    </a>
  );
}
