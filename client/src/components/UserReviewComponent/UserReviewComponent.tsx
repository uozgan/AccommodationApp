import AverageRatingsComponent from "../AverageRatingsComponent/AverageRatingsComponent";
import StarRating from "../StarRatingDisplay/StarRatingDisplay";
import {
  AboutTheTrip,
  User,
  UserComment,
  UserReviewComponentContainer,
  UserReviewGeneral,
} from "./UserReviewComponent.styles";

export interface UserReviewComponentProps {
  userReview: any;
}

const UserReviewComponent = ({ userReview }: UserReviewComponentProps) => {
  const entryDate = new Date(userReview.entryDate).toLocaleDateString("en-GB");
  const travelDate = new Date(userReview.travelDate).toLocaleDateString(
    "en-GB"
  );

  return (
    <UserReviewComponentContainer>
      <User>
        Added by {userReview.user} on {entryDate}
      </User>
      <UserReviewGeneral>
        <UserComment>
          <h2>{userReview.titles[userReview.locale]}</h2>
          <p>{userReview.texts[userReview.locale]}</p>
        </UserComment>
        <div style={{ width: "33.3%" }}>
          <div>
            <div>{`General (${userReview.ratings.general.general}/10)`}</div>
            <StarRating rating={userReview.ratings.general.general} />
          </div>
          <AboutTheTrip>
            <span>About the Trip</span>
            <div>date: {travelDate}</div>
            <div>with: {userReview.traveledWith}</div>
          </AboutTheTrip>
        </div>
      </UserReviewGeneral>
      <div>
        <h3>Rating of aspects:</h3>
        <AverageRatingsComponent aspecsAvg={userReview.ratings.aspects} />
      </div>
    </UserReviewComponentContainer>
  );
};

export default UserReviewComponent;
