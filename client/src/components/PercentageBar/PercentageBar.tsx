import {
  PercentageBarWrapper,
  PercentageIndicator,
} from "./PercentageBar.styles";

export interface PercentageBarProps {
  percentage: number;
}

const PercentageBar = ({ percentage }: PercentageBarProps) => {
  return (
    <PercentageBarWrapper>
      <PercentageIndicator percentage={percentage} />
    </PercentageBarWrapper>
  );
};

export default PercentageBar;
