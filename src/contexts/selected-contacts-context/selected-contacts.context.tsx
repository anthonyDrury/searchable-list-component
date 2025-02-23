import React, { PropsWithChildren, useCallback } from "react";
import { SelectedContactsRecord } from "../../types/types";

export type SelectedContactsContextType = {
  selectedContacts: SelectedContactsRecord;
  toggleSelectedContact: (contactId: string) => void;
  isContactSelected: (contact: string) => boolean;
};
export const SelectedContactsContext =
  React.createContext<SelectedContactsContextType>({
    selectedContacts: {},
    toggleSelectedContact: (contactId: string) => {},
    isContactSelected: (contactId: string) => false,
  });

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
