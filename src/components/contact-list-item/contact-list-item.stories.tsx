import type { Meta, StoryObj } from "@storybook/react";
import { DEFAULT_CONTACT } from "../../constants/story-constants";
import { SelectedContactsProvider } from "../../contexts/selected-contacts-context/selected-contacts.context";
import { ContactListItem } from "./contact-list-item";
import { fn } from "@storybook/test";

const meta = {
  title: "Example/ContactListItem",
  component: ContactListItem,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    contact: {
      control: {
        type: "object",
      },
    },
    displayEmail: { control: "boolean" },
  },
  args: {
    contact: DEFAULT_CONTACT,
  },
  render: (args) => (
    <SelectedContactsProvider onSelectedContactsChange={fn()}>
      <ContactListItem {...args} />
    </SelectedContactsProvider>
  ),
} satisfies Meta<typeof ContactListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contact: DEFAULT_CONTACT,
  },
};

export const DisplayEmail: Story = {
  args: {
    contact: DEFAULT_CONTACT,
    displayEmail: true,
  },
};

export const Enabled: Story = {
  args: {
    contact: DEFAULT_CONTACT,
  },
};

export const EnabledWithDisplayEmail: Story = {
  args: {
    contact: DEFAULT_CONTACT,
    displayEmail: true,
  },
};
