import { Stars } from "./StarRatingDisplay.styles";

export interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const percentage = (rating / 10) * 100;
  return <Stars percentage={percentage}></Stars>;
};

export default StarRating;
