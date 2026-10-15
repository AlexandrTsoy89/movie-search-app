type MovieScoreProps = {
  rating: number;
};

export default function MovieScore({ rating }: MovieScoreProps) {
  function getRatingColor(rating: number): string {
    if (rating < 3) {
      return "#E90000";
    }

    if (rating < 5) {
      return "#E97E00";
    }

    if (rating <= 7) {
      return "#E9D100";
    }

    return "#66E900";
  }

  const borderColor = getRatingColor(rating);

  return (
    <div
      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 text-[12px]"
      style={{ borderColor }}
    >
      {rating.toFixed(1)}
    </div>
  );
}
