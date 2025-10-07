"use client";
import ReactStars from "react-stars";

<<<<<<< HEAD
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
=======
export default function Rating() {
  return (
    <ReactStars
      count={5}
      value={0}
      onChange={(newRating) => console.log(newRating)}
>>>>>>> bf310c397981b3cde97e46cbdd418de51e094480
      size={24}
      color2={"#08a818"}
    />
  );
}
