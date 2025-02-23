import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchableList } from "./searchable-list";
import { DEFAULT_CONTACT_LIST } from "../../constants/story-constants";
import { Contact, SelectedContactsRecord } from "../../types/types";
import {
  CONTENT_BACKGROUND_PRIMARY,
  DEFAULT_CONTACT_IMAGE_URL,
} from "../../constants/constants";

describe("SearchableList", () => {
  const onSelectedContactsChange = jest.fn();

  it("Matches the default snapshot", () => {
    const { container } = render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("Matches the email display snapshot", () => {
    const { container } = render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
        displayEmail
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("Renders the Searchable lists and all details", () => {
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
    const attendedHeader = screen.getByText("Attended");
    expect(attendedHeader).toBeInTheDocument();
    const absentHeader = screen.getByText("Absent");
    expect(absentHeader).toBeInTheDocument();

    DEFAULT_CONTACT_LIST.forEach((contact) => {
      const contactName = screen.getByText(contact.name);
      expect(contactName).toBeInTheDocument();
    });
  });

  it("Renders the Searchable lists and all details with displayed email", () => {
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
        displayEmail
      />
    );

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
    const attendedHeader = screen.getByText("Attended");
    expect(attendedHeader).toBeInTheDocument();
    const absentHeader = screen.getByText("Absent");
    expect(absentHeader).toBeInTheDocument();

    DEFAULT_CONTACT_LIST.forEach((contact) => {
      const contactName = screen.getByText(contact.name);
      expect(contactName).toBeInTheDocument();
    });
  });

  it("Triggers onSelectedContactsChange with the correct value when a contact is selected", () => {
    const selectedContacts: SelectedContactsRecord = {};
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );

    DEFAULT_CONTACT_LIST.forEach((contact) => {
      const contactName = screen.getByText(contact.name);
      act(() => {
        contactName.click();
      });

      selectedContacts[contact.id] = true;
      expect(onSelectedContactsChange).toHaveBeenCalledWith(selectedContacts);
    });

    // Make sure that all contacts were selected
    expect(Object.keys(selectedContacts).length).toBe(
      DEFAULT_CONTACT_LIST.length
    );
  });

  it("Filters the list when the search input is used", async () => {
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );

    const searchInput: HTMLInputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, {
      target: { value: DEFAULT_CONTACT_LIST[0].name },
    });

    const contactName = screen.getByText(DEFAULT_CONTACT_LIST[0].name);
    expect(contactName).toBeInTheDocument();
  });

  it("Filters the list with email when the search input is used and displayEmail is true", async () => {
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
        displayEmail
      />
    );

    const searchInput: HTMLInputElement = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, {
      target: { value: DEFAULT_CONTACT_LIST[0].email },
    });

    const contactName = screen.getByText(DEFAULT_CONTACT_LIST[0].name);
    expect(contactName).toBeInTheDocument();
  });

  it("Applies the correct selected styles when a contact is selected", () => {
    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );
    const contactName = screen.getByText(DEFAULT_CONTACT_LIST[0].name);
    act(() => {
      contactName.click();
    });

    expect(contactName).toHaveStyleRule(
      `background-color: ${CONTENT_BACKGROUND_PRIMARY}`
    );
  });

  it("Defaults to the default image when none is provided", () => {
    render(
      <SearchableList
        contacts={[{ ...DEFAULT_CONTACT_LIST[0], displayImageURL: undefined }]}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );

    const displayImage = screen.getByAltText(
      `${DEFAULT_CONTACT_LIST[0].name}'s display image`
    );
    expect(displayImage).toHaveAttribute("src", DEFAULT_CONTACT_IMAGE_URL);
  });

  it("Should hide the list when the header is collapsed, and display it when it's expanded", () => {
    const [attended, absent] = DEFAULT_CONTACT_LIST.reduce<
      [Contact[], Contact[]]
    >(
      (acc, contact) => {
        if (contact.attended) {
          acc[0].push(contact);
        } else {
          acc[1].push(contact);
        }
        return acc;
      },
      [[], []]
    );

    render(
      <SearchableList
        contacts={DEFAULT_CONTACT_LIST}
        onSelectedContactsChange={onSelectedContactsChange}
      />
    );

    const attendedHeader = screen.getByText("Attended");
    const absentHeader = screen.getByText("Absent");

    expect(attendedHeader).toBeInTheDocument();
    expect(absentHeader).toBeInTheDocument();

    act(() => {
      attendedHeader.click();
    });

    attended.forEach((contact) => {
      const contactName = screen.queryByText(contact.name);
      expect(contactName).not.toBeInTheDocument();
    });

    act(() => {
      attendedHeader.click();
    });

    attended.forEach((contact) => {
      const contactName = screen.queryByText(contact.name);
      expect(contactName).toBeInTheDocument();
    });

    act(() => {
      absentHeader.click();
    });

    absent.forEach((contact) => {
      const contactName = screen.queryByText(contact.name);
      expect(contactName).not.toBeInTheDocument();
    });

    act(() => {
      absentHeader.click();
    });

    absent.forEach((contact) => {
      const contactName = screen.getByText(contact.name);
      expect(contactName).toBeInTheDocument();
    });
  });
});
