import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

type RatingProps = {
  rating: number;
  numReviews?: number;
  caption?: string;
};

const Rating: React.FC<RatingProps> = ({ rating, numReviews, caption }) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={index <= rating ? solidStar : regularStar}
          className={`text-yellow-500`}
        />
      ))}
      {numReviews && <span className="ml-2">{numReviews} reviews</span>}
      {caption && <span className="ml-2">{caption}</span>}
    </div>
  );
};

export default Rating;
