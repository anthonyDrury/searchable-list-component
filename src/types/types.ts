export type Contact = {
  id: string;
  name: string;
  attended?: boolean;
  displayImageURL?: string;
  email?: string;
};

export type SelectedContactsRecord = Record<Contact["id"], boolean>;
