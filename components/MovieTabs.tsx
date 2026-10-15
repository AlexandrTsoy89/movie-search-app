"use client";

import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";

export default function MovieTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname === "/rated" ? "rated" : "search";

  function handleTabChange(key: string) {
    if (key === "rated") {
      router.push("/rated");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            key: "search",
            label: "Search",
          },
          {
            key: "rated",
            label: "Rated",
          },
        ]}
      />
    </div>
  );
}
