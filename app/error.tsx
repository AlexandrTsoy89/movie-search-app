"use client";

import { Alert, Button } from "antd";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="mx-auto max-w-[936px] py-5">
      <Alert
        message="Error"
        description="Unable to load movies. Please check your internet connection and try again."
        type="error"
        showIcon
        action={
          <Button size="small" danger onClick={reset}>
            Try again
          </Button>
        }
      />
    </main>
  );
}
