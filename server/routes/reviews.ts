import express from "express";
import _ from "underscore";
import reviews from "../api/reviews.json";
import util from "../_util";

const router = express.Router();

router.get("/", (req, res) => {
  const { start = 1, limit, filterBy, sortBy = "entryDate" } = req.query;
  const data = _.sortBy(reviews, sortBy).reverse(); // reverse to sort desc
  const filtered = data.filter((review) =>
    filterBy ? review.traveledWith === filterBy : true
  );
  const paginated = filtered.slice(Number(start) - 1, limit);

  res.json({ all: data, filtered: filtered, limited: paginated });
});

router.get("/average", (req, res) => {
  const { generalAvg, aspecsAvg } = util.getAverageRatings(reviews);
  const traveledWithAvg = util.getAverageTravelledWith(reviews);

  res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});

export default router;
