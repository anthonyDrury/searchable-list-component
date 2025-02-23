import { PropsWithChildren, useCallback, useState } from "react";
import styled from "styled-components";
import {
  BORDER_COLOR,
  CONTENT_BACKGROUND,
  CONTENT_BACKGROUND_SECONDARY,
} from "../../constants/constants";
import { ContactContainer } from "../contact-list-item/contact-list-item";
import { Icon, IconTypes } from "../icon/icon";
import { Section, SectionContainer } from "../section/section";

type SectionHeaderProps = {
  /** The name of the current header */
  headerName: string;
};
/**
 * Displays a collapsable section header.
 * When the header is clicked, the section toggle it's state of expanded or collapsed.
 *
 * Used in the `SearchableList` component.
 */
export const SectionHeader = ({
  headerName,
  children,
}: PropsWithChildren<SectionHeaderProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsHeaderOpen = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <SectionHeaderContainer $open={isOpen}>
      <Header onClick={toggleIsHeaderOpen}>
        <p>{headerName}</p>
        <Icon type={isOpen ? IconTypes.ChevronDown : IconTypes.ChevronRight} />
      </Header>
      {isOpen ? <Section>{children}</Section> : null}
    </SectionHeaderContainer>
  );
};

const Header = styled.div`
  cursor: pointer;
  height: 37px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  padding-left: 16px;
  background: ${CONTENT_BACKGROUND};
  border-bottom: 1px solid ${CONTENT_BACKGROUND_SECONDARY};
  line-height: 20px;

  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: ${BORDER_COLOR};

  max-width: 400px;
`;

const SectionHeaderContainer = styled.div<{ $open?: boolean }>`
  display: flex;
  flex-direction: column;

  max-width: 400px;

  // newer psuedo-class, may not be appropriate depending on what browser versions need to be supported. But it's neat!
  &:has(> ${Header}:hover) {
    ${SectionContainer}, ${ContactContainer}, {
      background: ${CONTENT_BACKGROUND_SECONDARY};
    }
    > ${Header} {
      background: ${CONTENT_BACKGROUND_SECONDARY};
    }
  }
`;
