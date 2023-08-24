import styled from "styled-components";

export const DeviceBreakPoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

export const device = {
  mobile: `(min-width: ${DeviceBreakPoints.mobile}px)`,
  tablet: `(min-width: ${DeviceBreakPoints.tablet}px)`,
  laptop: `(min-width: ${DeviceBreakPoints.laptop}px)`,
  desktop: `(min-width: ${DeviceBreakPoints.desktop}px)`,
};

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 10px;
  width: 100%;

  @media ${device.mobile} {
  }

  @media ${device.tablet} {
  }

  @media ${device.laptop} {
  }

  @media ${device.desktop} {
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
