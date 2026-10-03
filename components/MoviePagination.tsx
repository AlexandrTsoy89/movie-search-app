"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";

type MoviePaginationProps = {
  currentPage: number;
  totalMovies: number;
};

export default function MoviePagination({
  currentPage,
  totalMovies,
}: MoviePaginationProps) {
  const router = useRouter();

  function handlePageChange(page: number) {
    router.push(`/?page=${page}`);
  }

  return (
    <Pagination
      current={currentPage}
      total={totalMovies}
      pageSize={6}
      showSizeChanger={false}
      onChange={handlePageChange}
    />
  );
}
