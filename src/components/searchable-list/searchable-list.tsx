import { useMemo, useState } from "react";
import styled from "styled-components";
import { CONTENT_BACKGROUND } from "../../constants/constants";
import { SelectedContactsProvider } from "../../contexts/selected-contacts-context/selected-contacts.context";
import { Contact, SelectedContactsRecord } from "../../types/types";
import { ContactList } from "../contact-list/contact-list";
import { SearchField } from "../search-field/search-field";
import { SectionHeader } from "../section-header/section-header";

type SearchableListProps = {
  onSelectedContactsChange: (
    newSelectedContacts: SelectedContactsRecord
  ) => void;
  displayEmail?: boolean;
  contacts: Contact[];
};
export const SearchableList = ({
  onSelectedContactsChange,
  displayEmail = false,
  contacts,
}: SearchableListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [attendedContacts, absentContacts] = useMemo(
    () => filterContacts(contacts, searchTerm),
    [contacts, searchTerm]
  );

  return (
    <SearchableListContainer>
      <SearchField onSearch={setSearchTerm} />
      <SelectedContactsProvider
        onSelectedContactsChange={onSelectedContactsChange}
      >
        <SectionHeader headerName="Attended">
          <ContactList
            contacts={attendedContacts}
            displayEmail={displayEmail}
            enabled={false}
          />
        </SectionHeader>
        <SectionHeader headerName="Absent">
          <ContactList
            contacts={absentContacts}
            displayEmail={displayEmail}
            enabled={false}
          />
        </SectionHeader>
      </SelectedContactsProvider>
    </SearchableListContainer>
  );
};

const filterContacts = (
  contacts: Contact[],
  searchTerm: string
): [Contact[], Contact[]] =>
  contacts.reduce(([attended, absent], cur) => {
    const filterMatch = searchTerm
      ? cur.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    if (filterMatch) {
      if (cur.attended) {
        return [[...attended, cur], absent];
      } else {
        return [attended, [...absent, cur]];
      }
    }
    return [attended, absent];
  }, EMPTY_CONTACTS);

// Outside of the component to ensure no empty value changes on re-renders
const EMPTY_CONTACTS: [Contact[], Contact[]] = [[], []];

const SearchableListContainer = styled.div`
  background-color: ${CONTENT_BACKGROUND};
  max-width: 400px;
`;
