import styled from "styled-components";

export interface PercentageIndicatorProps {
  percentage: number;
}

export const PercentageBarWrapper = styled.div`
  width: 100%;
  background-color: lightGrey;
  height: 16px;
  position: relative;
`;

export const PercentageIndicator = styled.div<PercentageIndicatorProps>`
  position: absolute;
  background-color: blue;
  height: 16px;
  width: ${({ percentage }) => percentage}%;
`;
