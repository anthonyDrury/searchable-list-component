import { PropsWithChildren } from "react";
import styled from "styled-components";
import { CONTENT_BACKGROUND } from "../../constants/constants";

/** A simple component to render a section, which simply applies some styles with a surrounding `div` */
export const Section = ({ children }: PropsWithChildren<{}>) => {
  return <SectionContainer>{children}</SectionContainer>;
};

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${CONTENT_BACKGROUND};
`;
