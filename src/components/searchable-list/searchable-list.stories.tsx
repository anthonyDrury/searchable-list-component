import type { Meta, StoryObj } from "@storybook/react";
import { DEFAULT_CONTACT_LIST } from "../../constants/story-constants";
import { SearchableList } from "./searchable-list";

import { fn } from "@storybook/test";

const meta = {
  title: "Example/SearchableList",
  component: SearchableList,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    displayEmail: { control: "boolean" },
    contacts: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    onSelectedContactsChange: fn(),
    contacts: DEFAULT_CONTACT_LIST,
  },
} satisfies Meta<typeof SearchableList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelectedContactsChange: fn(),
    contacts: DEFAULT_CONTACT_LIST,
  },
};
export const DisplayEmail: Story = {
  args: {
    onSelectedContactsChange: fn(),
    contacts: DEFAULT_CONTACT_LIST,
    displayEmail: true,
  },
};
