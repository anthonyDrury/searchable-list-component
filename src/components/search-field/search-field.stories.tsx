import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./search-field";
import { fn } from "@storybook/test";

const meta = {
  title: "Example/SearchField",
  component: SearchField,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "onSearch" },
  },
  args: {
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: fn(),
  },
};
