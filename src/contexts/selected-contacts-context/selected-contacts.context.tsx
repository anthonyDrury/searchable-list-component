import React, { PropsWithChildren, useCallback } from "react";
import { SelectedContactsRecord } from "../../types/types";

type SelectedContactsContextType = {
  /** The record of selected contacts, where the key is the contact's id and the value is a boolean indicating whether the contact is selected */
  selectedContacts: SelectedContactsRecord;
  /** Toggles the selected state of a contact by passing it the contact's id */
  toggleSelectedContact?: (contactId: string) => void;
  /** Returns whether a contact is selected by passing it the contact's id */
  isContactSelected?: (contactId: string) => boolean;
};

/**
 * The context which holds the selectedContact information and utils.
 * Used throughout the `searchable-list` component.
 * Contacts are selected/deselected by clicking on a `contact-list-item` component. Which should be a child within the provider's child tree.
 */
export const SelectedContactsContext =
  React.createContext<SelectedContactsContextType>({
    selectedContacts: {},
  });

/**
 * Wraps the children in a context provider, which manages the list of selected contacts.
 * Contacts are selected by clicking on the `contact-list-item` component. Which should be a child within the tree of this provider's children.
 */
export const SelectedContactsProvider = ({
  children,
  onSelectedContactsChange,
}: PropsWithChildren<{
  onSelectedContactsChange: (
    newSelectedContacts: SelectedContactsRecord
  ) => void;
}>) => {
  const [selectedContacts, setSelectedContacts] =
    React.useState<SelectedContactsRecord>({});

  const toggleSelectedContact = useCallback(
    (contactId: string) => {
      setSelectedContacts((prev) => {
        const newRecord = {
          ...prev,
          [contactId]: !prev[contactId],
        };
        onSelectedContactsChange(newRecord);
        return newRecord;
      });
    },
    [onSelectedContactsChange]
  );

  const isContactSelected = useCallback(
    (contactId: string) => selectedContacts[contactId] ?? false,
    [selectedContacts]
  );

  return (
    <SelectedContactsContext.Provider
      value={{ selectedContacts, toggleSelectedContact, isContactSelected }}
    >
      {children}
    </SelectedContactsContext.Provider>
  );
};
