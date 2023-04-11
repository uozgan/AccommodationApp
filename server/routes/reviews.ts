import express from "express";
import _ from "underscore";
import reviews from "../api/reviews.json";
import util from "../_util";

const router = express.Router();

router.get("/", (req, res) => {
  const { start = 1, limit, filterBy, sortBy = "entryDate" } = req.query;
  const data = _.sortBy(reviews, sortBy).reverse(); // reverse to sort desc
  const filtered = data.filter((review) =>
    filterBy ? review.traveledWith.toLowerCase() === filterBy : true
  );
  const startValue = Number(start);
  const limitValue = Number(limit);
  const paginated = filtered.slice(
    startValue > 1 ? (startValue - 1) * limitValue : startValue - 1,
    limitValue * startValue
  );

  res.json({ all: data, filtered: filtered, limited: paginated });
});

router.get("/average", (req, res) => {
  const { generalAvg, aspecsAvg } = util.getAverageRatings(reviews);
  const traveledWithAvg = util.getAverageTravelledWith(reviews);

  res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});

export default router;
