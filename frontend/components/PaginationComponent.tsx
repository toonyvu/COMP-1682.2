import { Dispatch, SetStateAction } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "./ui/pagination";

type Props = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function PaginationComponent({
  page,
  totalPages,
  setPage,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => p - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            >
              Prev
            </PaginationPrevious>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink>
                  <button
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded ${
                      page === pageNum
                        ? "bg-green-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => p + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
