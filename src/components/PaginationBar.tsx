import Link from "next/link";
import { JSX } from "react";

interface IPaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({ currentPage, totalPages }: IPaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        aria-current={currentPage === page ? "page" : undefined}
        aria-label={"Go to Page " + page}
        tabIndex={currentPage === page ? -1 : undefined}
        className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
      >
        {page}
      </Link>
    );
  }

  return (
    <div className="flex justify-center">
      <nav className="join hidden sm:block">{numberedPageItems}</nav>
      <nav className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="join-item btn" aria-label="Go to previous page">
            «
          </Link>
        )}
        <div className="join-item btn pointer-events-none">Page {currentPage}</div>
        {currentPage < totalPages && (
          <Link href={"?page=" + (currentPage + 1)} className="join-item btn" aria-label="Go to next page">
            »
          </Link>
        )}
      </nav>
    </div>
  );
}
