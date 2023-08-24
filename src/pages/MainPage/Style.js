import styled from "styled-components";

const size = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 10px;
  width: 100%;

  @media ${device.mobile} {
    background-color: green;
  }

  @media ${device.tablet} {
    background-color: orange;
  }

  @media ${device.laptop} {
    background-color: blue;
  }

  @media ${device.desktop} {
    background-color: yellow;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2px;
  margin: 10px;

  @media ${device.mobile} {
  }

  @media ${device.tablet} {
  }

  @media ${device.laptop} {
  }

  @media ${device.desktop} {
  }
`;
