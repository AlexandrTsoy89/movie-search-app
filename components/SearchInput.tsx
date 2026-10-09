"use client";

import { Input } from "antd";
import debounce from "lodash/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
          params.set("query", value.trim());
        } else {
          params.delete("query");
        }

        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
      }, 500),
    [pathname, router, searchParams],
  );

  return (
    <Input
      placeholder="Type to search..."
      defaultValue={searchParams.get("query") ?? ""}
      onChange={(event) => handleSearch(event.target.value)}
    />
  );
}
