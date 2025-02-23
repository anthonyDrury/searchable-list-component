import { useCallback } from "react";
import styled from "styled-components";
import { CONTENT_BACKGROUND, TEXT_BLACK } from "../../constants/constants";
import { Icon, IconTypes } from "../icon/icon";

type SearchFieldProps = {
  onSearch: (searchTerm: string) => void;
};
export const SearchField = ({ onSearch }: SearchFieldProps) => {
  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  return (
    <SearchContainer>
      <Icon type={IconTypes.Search} />
      <SearchInput placeholder="Search" onChange={onSearchChange} />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  background-color: ${CONTENT_BACKGROUND};
  display: flex;
  align-items: center;
  height: 48px;
  gap: 4px;
  font-size: 14px;
  color: ${TEXT_BLACK};
  padding: 8px 16px;

  max-width: 400px;
`;

const SearchInput = styled.input`
  font-size: 14px;
  line-height: 20px;
  color: ${TEXT_BLACK};
  border: none;

  textarea:focus,
  input:focus {
    outline: none;
  }
  outline: none;
`;
