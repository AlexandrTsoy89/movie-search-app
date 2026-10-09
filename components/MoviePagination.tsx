"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type MoviePaginationProps = {
  currentPage: number;
  totalMovies: number;
};

export default function MoviePagination({
  currentPage,
  totalMovies,
}: MoviePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination
      current={currentPage}
      total={totalMovies}
      pageSize={20}
      showSizeChanger={false}
      onChange={handlePageChange}
    />
  );
}
