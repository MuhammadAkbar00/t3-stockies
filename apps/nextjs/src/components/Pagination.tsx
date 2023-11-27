import React from "react";
import { DOTS, usePagination } from "../helper/usePagination";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="mt-4 flex md:gap-6 md:rounded-md md:px-8 md:py-2">
      <li
        onClick={onPrevious}
        className={`flex h-8 w-8 shrink-0 grow-0 cursor-pointer select-none items-center justify-center rounded-lg md:text-2xl ${
          currentPage === 1 ? "cursor-default text-[#CCC]" : ""
        }`}
      >
        <div>{"Prev"}</div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="cursor-pointer md:text-2xl">
              ...
            </li>
          );
        }
        return (
          <li
            key={index}
            onClick={() => onPageChange(pageNumber as number)}
            className={`flex h-8 w-8 shrink-0 grow-0 cursor-pointer select-none items-center justify-center rounded-lg border hover:bg-[#2F80ED] hover:text-white md:text-2xl ${
              pageNumber === currentPage ? "bg-[#2F80ED] text-white" : ""
            }`}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        onClick={onNext}
        className={`flex h-8 w-8 shrink-0 grow-0 cursor-pointer select-none items-center justify-center rounded-lg md:text-2xl ${
          currentPage === lastPage ? "cursor-default text-[#CCC]" : ""
        }`}
      >
        <div>{"Next"}</div>
      </li>
    </ul>
  );
};

export default Pagination;
