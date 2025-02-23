import { Contact } from "../../types/types";
import { ContactListItem } from "../contact-list-item/contact-list-item";

type ContactListItemProps = {
  contacts: Contact[];
  displayEmail: boolean;
  enabled?: boolean;
};
export const ContactList = ({
  contacts,
  displayEmail,
}: ContactListItemProps) => {
  return (
    <>
      {contacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          displayEmail={displayEmail}
        />
      ))}
    </>
  );
};
