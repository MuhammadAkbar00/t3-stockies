interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationOUTDATED: React.FC<PaginationProps> = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className="flex list-none items-center justify-between">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage
                ? "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-300 bg-red-500"
                : "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-300"
            }
          >
            <a className="cursor-pointer" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationOUTDATED;
