import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import {
  CONTENT_BACKGROUND,
  CONTENT_BACKGROUND_PRIMARY,
  CONTENT_BACKGROUND_SECONDARY,
  DEFAULT_CONTACT_IMAGE_URL,
  TEXT_BLACK,
  TEXT_LIGHT,
  TEXT_PRIMARY,
} from "../../constants/constants";
import { SelectedContactsContext } from "../../contexts/selected-contacts-context/selected-contacts.context";
import { Contact } from "../../types/types";

type ContactListItemProps = {
  /** The contact to display */
  contact: Contact;
  /** Whether to display the contact's email */
  displayEmail: boolean;
};

/**
 * An item displaying a contact's details.
 * Also allows selecting and unselecting the contact, which is managed by the `SelectedContactsContext`.
 *
 * Used in the `ContactList` component.
 */
export const ContactListItem = ({
  contact,
  displayEmail,
}: ContactListItemProps) => {
  const { isContactSelected, toggleSelectedContact } = React.useContext(
    SelectedContactsContext
  );

  const isContactEnabled = useMemo(
    () => !!isContactSelected?.(contact.id),
    [contact.id, isContactSelected]
  );

  const onContactClick = useCallback(
    () => toggleSelectedContact?.(contact.id),
    [contact.id, toggleSelectedContact]
  );

  const shouldDisplayEmail = !!(displayEmail && contact.email);

  return (
    <ContactContainer $enabled={isContactEnabled} onClick={onContactClick}>
      <ContactImage
        src={contact.displayImageURL || DEFAULT_CONTACT_IMAGE_URL}
        alt={`${contact.name}'s display image`}
      />
      <ContactDetails>
        <ContactName>{contact.name}</ContactName>
        {shouldDisplayEmail ? (
          <ContactEmail>{contact.email}</ContactEmail>
        ) : null}
      </ContactDetails>
    </ContactContainer>
  );
};

const ContactImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_BLACK};
`;

const ContactEmail = styled.p`
  font-size: 13px;
  color: ${TEXT_LIGHT};
`;

export const ContactContainer = styled.div<{ $enabled?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  height: 52px;
  background-color: ${CONTENT_BACKGROUND};
  border-radius: 6px;
  padding: 8px;
  gap: 12px;

  max-width: 400px;

  &:hover {
    background-color: ${CONTENT_BACKGROUND_SECONDARY};
  }

  ${({ $enabled }) =>
    $enabled
      ? `
      background-color: ${CONTENT_BACKGROUND_PRIMARY} !important; // !important to override the hover state which can be applied via parent psuedo-classes

        ${ContactName}, ${ContactEmail} {
          color: ${TEXT_PRIMARY};
        }
    `
      : ""}
`;
