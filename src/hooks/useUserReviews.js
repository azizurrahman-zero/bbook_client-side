import { useEffect, useState } from "react";

const useUserReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  useEffect(() => {
    fetch("https://bbook.onrender.com/user-reviews")
      .then((res) => res.json())
      .then((data) => setUserReviews(data));
  }, []);
  return [userReviews, setUserReviews];
};

export default useUserReviews;
