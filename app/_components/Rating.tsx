"use client";
import ReactStars from "react-stars";

export default function Rating() {
  return (
    <ReactStars
      count={5}
      value={0}
      onChange={(newRating) => console.log(newRating)}
      size={24}
      color2={"#08a818"}
    />
  );
}
