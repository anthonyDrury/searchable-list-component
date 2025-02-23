import { useMemo, useState } from "react";
import styled from "styled-components";
import { CONTENT_BACKGROUND } from "../../constants/constants";
import { SelectedContactsProvider } from "../../contexts/selected-contacts-context/selected-contacts.context";
import { Contact, SelectedContactsRecord } from "../../types/types";
import { ContactList } from "../contact-list/contact-list";
import { SearchField } from "../search-field/search-field";
import { SectionHeader } from "../section-header/section-header";

type SearchableListProps = {
  /** The callback to receive updates when the record of selected contacts changes */
  onSelectedContactsChange: (
    newSelectedContacts: SelectedContactsRecord
  ) => void;
  /** Whether to display the contacts emails, also enabled searching via email */
  displayEmail?: boolean;
  /** The list of contacts to display */
  contacts: Contact[];
};
/**
 *
 * A combined component that displays a list of searchable and selectable contacts, filtered by attendance.
 * Allows filtering via a search field (`SearchField`). Which can be used to search for contacts by name, or email if `displayEmail` is set to true.
 * Allows selecting contacts by clicking on the `ContactListItem` components within the attendance lists.
 */
export const SearchableList = ({
  onSelectedContactsChange,
  displayEmail = false,
  contacts,
}: SearchableListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [attendedContacts, absentContacts] = useMemo(
    () => filterContacts(contacts, searchTerm, displayEmail),
    [contacts, searchTerm, displayEmail]
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

/**
 * Helper method to filter the contacts based on the search term, the contact details, and attendance.
 */
const filterContacts = (
  contacts: Contact[],
  searchTerm: string,
  checkEmail: boolean
): [Contact[], Contact[]] =>
  contacts.reduce(([attended, absent], cur) => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    const nameMatch = cur.name?.toLowerCase().includes(lowerCaseTerm);
    const emailMatch = checkEmail
      ? cur?.email?.toLowerCase().includes(lowerCaseTerm)
      : false;

    const filterMatch = searchTerm ? nameMatch || emailMatch : true;

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
