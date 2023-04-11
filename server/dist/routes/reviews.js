"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const underscore_1 = __importDefault(require("underscore"));
const reviews_json_1 = __importDefault(require("../api/reviews.json"));
const _util_1 = __importDefault(require("../_util"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const { start = 1, limit, filterBy, sortBy = "entryDate" } = req.query;
    const data = underscore_1.default.sortBy(reviews_json_1.default, sortBy).reverse(); // reverse to sort desc
    const filtered = data.filter((review) => filterBy ? review.traveledWith.toLowerCase() === filterBy : true);
    const startValue = Number(start);
    const limitValue = Number(limit);
    const paginated = filtered.slice(startValue > 1 ? (startValue - 1) * limitValue : startValue - 1, limitValue * startValue);
    res.json({ all: data, filtered: filtered, limited: paginated });
});
router.get("/average", (req, res) => {
    const { generalAvg, aspecsAvg } = _util_1.default.getAverageRatings(reviews_json_1.default);
    const traveledWithAvg = _util_1.default.getAverageTravelledWith(reviews_json_1.default);
    res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});
exports.default = router;
//# sourceMappingURL=reviews.js.map