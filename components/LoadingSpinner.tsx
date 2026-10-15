import { Spin } from "antd";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Spin size="large" description="Loading movies..." />
    </div>
  );
}
