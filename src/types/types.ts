/** A type representing a contacts information */
export type Contact = {
  /** Unique ID for the Contact */
  id: string;
  /** The name of the Contact */
  name: string;
  /** Whether the contact attended */
  attended?: boolean;
  /** URL to the contact's display image */
  displayImageURL?: string;
  /** The contact's email address */
  email?: string;
};

/**
 * A Record of Contact IDs to booleans, representing whether a contact is selected.
 */
export type SelectedContactsRecord = Record<Contact["id"], boolean>;
