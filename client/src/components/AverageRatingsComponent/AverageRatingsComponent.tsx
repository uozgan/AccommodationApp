import StarRating from "../StarRatingDisplay/StarRatingDisplay";
import {
  Aspec,
  AspecWrapper,
  AverageRatingsContainer,
} from "./AverageRatingsComponent.styles";

export interface AverageRatingsComponentProps {
  aspecsAvg: any;
}

const AverageRatingsComponent = ({
  aspecsAvg,
}: AverageRatingsComponentProps) => {
  return (
    <AverageRatingsContainer>
      {Object.keys(aspecsAvg).map((aspec: string) => {
        return (
          aspecsAvg[`${aspec}`] > 0 && (
            <AspecWrapper key={aspec}>
              <Aspec>
                <p>{`${aspec} (${aspecsAvg[`${aspec}`]}/10)`}</p>
                <StarRating rating={aspecsAvg[`${aspec}`]} />
              </Aspec>
            </AspecWrapper>
          )
        );
      })}
    </AverageRatingsContainer>
  );
};

export default AverageRatingsComponent;
