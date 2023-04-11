import styled from "styled-components";

export interface StarsProps {
  percentage: number;
}

export const Stars = styled.div<StarsProps>`
  display: inline-block;
  font-size: 20px;
  font-family: Times;
  line-height: 1;

  &::before {
    content: "★★★★★★★★★★";
    background: ${({ percentage }) =>
      `linear-gradient(90deg, orange ${percentage}%, grey ${percentage}%)`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
