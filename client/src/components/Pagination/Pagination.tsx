import { useMemo } from "react";

export interface PaginationProps {
  limit: number;
  page: number;
  total: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({ limit, page, total, onPageChange }: PaginationProps) => {
  const pages = useMemo(() => {
    return Array.from({ length: total < limit ? total : limit }, (_, item) => {
      const sidePages = limit % 2 === 0 ? limit / 2 : Math.floor(limit / 2);
      let value = page + sidePages - item;

      if (page < limit - 1) {
        value = limit - item;
      }

      if (page > total - sidePages) {
        value = page - item;
      }

      if (total < limit && page !== total) {
        value -= 1;
      }

      return value;
    }).reverse();
  }, [limit, page, total]);

  return (
    <>
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
    </>
  );
};

export default Pagination;
