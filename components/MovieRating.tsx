"use client";

import { Rate, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

type MovieRatingProps = {
  movieId: number;
  initialRating?: number;
};

export default function MovieRating({
  movieId,
  initialRating = 0,
}: MovieRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [saving, setSaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  async function handleRatingChange(value: number) {
    if (saving) return;

    const previousRating = rating;

    setRating(value);
    setSaving(true);

    try {
      const response = await fetch(`/api/movies/${movieId}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error("Failed to save rating");
      }
      router.refresh();

      messageApi.success("Rating saved successfully");
    } catch (error) {
      console.error(error);

      setRating(previousRating);
      messageApi.error("Failed to save rating");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Rate
        count={10}
        allowHalf
        allowClear={false}
        value={rating}
        disabled={saving}
        onChange={handleRatingChange}
        className="!flex !w-full !justify-between !text-[14px] sm:!text-[20px] [&_.ant-rate-star]:!me-0"
      />
    </>
  );
}
