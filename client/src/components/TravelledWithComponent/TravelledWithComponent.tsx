import PercentageBar from "../PercentageBar/PercentageBar";
import {
  TravelledWith,
  TravelledWithContainer,
  TravelledWithWrapper,
} from "./TravelledWithComponent.styles";

export interface TravelledWithComponentProps {
  traveledWithAvg: any;
}

const TravelledWithComponent = ({
  traveledWithAvg,
}: TravelledWithComponentProps) => {
  return (
    <TravelledWithContainer>
      {Object.keys(traveledWithAvg).map((traveledWith: string) => (
        <TravelledWithWrapper key={traveledWith}>
          <TravelledWith>
            <p>{`${traveledWith} (${
              traveledWithAvg[`${traveledWith}`] * 10
            }/100)`}</p>
            <PercentageBar
              percentage={traveledWithAvg[`${traveledWith}`] * 10}
            />
          </TravelledWith>
        </TravelledWithWrapper>
      ))}
    </TravelledWithContainer>
  );
};

export default TravelledWithComponent;
