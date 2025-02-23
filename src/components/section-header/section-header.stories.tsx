import type { Meta, StoryObj } from "@storybook/react";
import {
  DEFAULT_CONTACT,
  DEFAULT_CONTACT_LIST,
} from "../../constants/story-constants";
import { SelectedContactsProvider } from "../../contexts/selected-contacts-context/selected-contacts.context";
import { ContactListItem } from "../contact-list-item/contact-list-item";
import { fn } from "@storybook/test";
import { SectionHeader } from "./section-header";
import { ContactList } from "../contact-list/contact-list";

const meta = {
  title: "Example/SectionHeader",
  component: SectionHeader,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    headerName: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    headerName: "Section Header",
  },
  render: (args) => (
    <SelectedContactsProvider onSelectedContactsChange={fn()}>
      <SectionHeader {...args}>
        <ContactList contacts={DEFAULT_CONTACT_LIST} displayEmail={false} />
      </SectionHeader>
    </SelectedContactsProvider>
  ),
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerName: "Attended",
    children: (
      <ContactList contacts={DEFAULT_CONTACT_LIST} displayEmail={false} />
    ),
  },
};

export const WithDisplayEmail: Story = {
  args: {
    headerName: "Attended",
    children: <ContactList contacts={DEFAULT_CONTACT_LIST} displayEmail />,
  },
};
