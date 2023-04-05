function getAverageRatings(reviews) {
  let generalCount = 0;
  let items = {};
  let itemsCounts = {};
  let aspects = Object.keys(reviews[0].ratings.aspects);
  reviews.forEach((review) => {
    let weight = getReviewWeight(review);
    generalCount += review.ratings.general.general * weight;
    aspects.forEach((a) => {
      items[a] = items[a] || 0;
      if (review.ratings.aspects[a]) {
        items[a] += review.ratings.aspects[a] * weight;
        itemsCounts[a] = itemsCounts[a] || 0;
        itemsCounts[a]++;
      }
    });
  });
  let generalAvg = (generalCount / reviews.length).toFixed(1);
  Object.keys(itemsCounts).map((item) => {
    itemsCounts[item] = (items[item] / itemsCounts[item]).toFixed(1);
  });
  return { generalAvg, aspecsAvg: itemsCounts };
}

function getAverageTravelledWith(reviews) {
  let categories = {};
  let categoriesCount = {};
  reviews.forEach((item) => {
    let category = item.traveledWith;
    categoriesCount[category] = categoriesCount[category] || 0;
    categoriesCount[category]++;
  });
  Object.keys(categoriesCount).forEach((item) => {
    categories[item] = (categoriesCount[item] * 10) / reviews.length;
  });

  return categories;
}

function getReviewWeight(review) {
  // TODO: return the right calculations here instead of 1
  // according to the provided info in README.md file
  return 1;
}

export default {
  getAverageRatings,
  getAverageTravelledWith,
};
