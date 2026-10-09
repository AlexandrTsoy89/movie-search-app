import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Spin size="large" />
      <p>Loading movies...</p>
    </div>
  );
}
