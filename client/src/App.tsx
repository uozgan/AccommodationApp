import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import UserReviewComponent from "./components/UserReviewComponent/UserReviewComponent";
import Pagination from "./components/Pagination/Pagination";
import AverageRatingsComponent from "./components/AverageRatingsComponent/AverageRatingsComponent";
import TravelledWithComponent from "./components/TravelledWithComponent/TravelledWithComponent";
import "./App.css";
import {
  FilterAndSortByContainer,
  FilterContainer,
  SortByContainer,
} from "./App.styles";

interface IAverageRatings {
  generalAvg: number;
  aspecsAvg: any;
  traveledWithAvg: any;
}

interface IReviews {
  all: any[];
  filtered: any[];
  limited: any[];
}

function App() {
  const [reviews, setReviews] = useState<IReviews>();
  const [averageRatings, setAverageRatings] = useState<IAverageRatings>();
  const [searchParams, setSearchParams] = useSearchParams();

  const getReviews = async () => {
    const start = searchParams.get("start") || 1;
    const limit = searchParams.get("limit") || "";
    const filterBy = searchParams.get("filterBy") || "";
    const sortBy = searchParams.get("sortBy") || "";

    const allReviews = await axios.get(
      `http://localhost:8080/reviews?start=${start}&limit=${limit}&filterBy=${filterBy}&sortBy=${sortBy}`
    );
    setReviews(allReviews.data);
  };

  const getAverageRatings = async () => {
    const avgRatings = await axios.get("http://localhost:8080/reviews/average");
    setAverageRatings(avgRatings.data);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParams.get("limit") === null) {
      searchParams.set("limit", "5");
      searchParams.set("start", "1");
      setSearchParams(searchParams);
    } else {
      getReviews();
      getAverageRatings();
    }
  }, [searchParams]);

  return (
    <div className="App">
      <h1>Hotel Amazing</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <h2>The average ratings for this accomodation</h2>

      {averageRatings && (
        <AverageRatingsComponent aspecsAvg={averageRatings?.aspecsAvg} />
      )}

      <h2>The percentages of travelledWith</h2>

      {averageRatings && (
        <TravelledWithComponent
          traveledWithAvg={averageRatings?.traveledWithAvg}
        />
      )}

      <FilterAndSortByContainer>
        <FilterContainer>
          <label htmlFor="travelledWith">Filter reviews by</label>
          <select
            name="travelledWith"
            id="travelledWith"
            onChange={(event) => {
              searchParams.set(
                "filterBy",
                event.target.value.toLocaleLowerCase()
              );
              setSearchParams(searchParams);
            }}
          >
            <option value="">All</option>
            {averageRatings &&
              Object.keys(averageRatings?.traveledWithAvg).map(
                (travelledWith: string) => (
                  <option key={travelledWith} value={travelledWith}>
                    {travelledWith}
                  </option>
                )
              )}
          </select>
        </FilterContainer>
        <SortByContainer>
          <span>Sort by:</span>
          <div>
            <input
              type="radio"
              id="entryDate"
              value="entryDate"
              name="sortBy"
              onChange={handleSortChange}
            />
            <label htmlFor="reviewDate">Review date</label>
            <input
              type="radio"
              id="travelDate"
              value="travelDate"
              name="sortBy"
              onChange={handleSortChange}
            />
            <label htmlFor="age1">Trip date</label>
          </div>
        </SortByContainer>
      </FilterAndSortByContainer>

      <div>
        {reviews && (
          <Pagination
            limit={Number(searchParams.get("limit"))}
            page={Number(searchParams.get("start"))}
            total={Math.ceil(
              reviews?.filtered?.length / Number(searchParams.get("limit"))
            )}
            onPageChange={(value) => {
              searchParams.set("start", String(value));
              setSearchParams(searchParams);
            }}
          />
        )}
      </div>

      <div>
        {reviews &&
          reviews.limited.map((review) => (
            <UserReviewComponent key={review.id} userReview={review} />
          ))}
      </div>

      <h2>Check the end points on server:</h2>
      <ul>
        <li>
          <a href="http://localhost:8080/reviews">
            http://localhost:8080/reviews
          </a>
        </li>
        <li>
          <a href="http://localhost:8080/reviews/average">
            http://localhost:8080/reviews/average
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
