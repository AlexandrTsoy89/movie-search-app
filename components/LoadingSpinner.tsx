import { Spin } from "antd";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Spin size="large" tip="Loading movies...">
        <div className="h-20 w-20" />
      </Spin>
    </div>
  );
}
