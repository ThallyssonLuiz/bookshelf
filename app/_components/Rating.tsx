"use client";
import ReactStars from "react-stars";

interface RatingProps {
  assessment: number;
  handleChange: (rating: number) => void;
}

export default function Rating({
  assessment,
  handleChange,
}: Readonly<RatingProps>) {
  return (
    <ReactStars
      count={5}
      value={assessment}
      onChange={(rating) => handleChange(rating)}
      size={24}
      color2={"#08a818"}
    />
  );
}
