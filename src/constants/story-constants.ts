import { Contact } from "../types/types";
import { DEFAULT_CONTACT_IMAGE_URL } from "./constants";

export const DEFAULT_CONTACT: Contact = {
  id: "00001",
  name: "John Doe",
  displayImageURL: DEFAULT_CONTACT_IMAGE_URL,
  email: "test@test.com",
  attended: false,
};

export const DEFAULT_CONTACT_LIST: Contact[] = [
  {
    id: "00000",
    name: "John Doe",
    displayImageURL: "/DISPLAY_IMAGE_0.png",
    email: "",
    attended: false,
  },
  {
    id: "00001",
    name: "Jane Doe",
    displayImageURL: "/DISPLAY_IMAGE_1.png",
    email: "test@test.com",
    attended: false,
  },
  {
    id: "00002",
    name: "Alice Smith",
    displayImageURL: "/DISPLAY_IMAGE_2.png",
    email: "alice@example.com",
    attended: true,
  },
  {
    id: "00003",
    name: "Bob Johnson",
    displayImageURL: "/DISPLAY_IMAGE_3.png",
    email: "bob@example.com",
    attended: false,
  },
  {
    id: "00004",
    name: "Charlie Brown",
    displayImageURL: "/DISPLAY_IMAGE_4.png",
    email: "charlie@example.com",
    attended: true,
  },
  {
    id: "00005",
    name: "Diana Prince",
    displayImageURL: "/DISPLAY_IMAGE_5.png",
    email: "diana@example.com",
    attended: false,
  },
  {
    id: "00006",
    name: "Eve Adams",
    displayImageURL: "/DISPLAY_IMAGE_6.png",
    email: "eve@example.com",
    attended: true,
  },
  {
    id: "00007",
    name: "Frank Castle",
    displayImageURL: "/DISPLAY_IMAGE_7.png",
    email: "frank@example.com",
    attended: false,
  },
  {
    id: "00008",
    name: "Grace Hopper",
    displayImageURL: "/DISPLAY_IMAGE_8.png",
    email: "grace@example.com",
    attended: true,
  },
  {
    id: "00009",
    name: "Hank Pym",
    displayImageURL: "/DISPLAY_IMAGE_9.png",
    email: "hank@example.com",
    attended: false,
  },
  {
    id: "00010",
    name: "Ivy Wayne",
    displayImageURL: undefined,
    email: undefined,
    attended: false,
  },
];
