import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Dropdown from ".";

describe("dropdown", () => {
  const mockOptions = [
    { icon: "/icon1.png", label: "Option 1" },
    { icon: "/icon2.png", label: "Option 2" },
  ];

  it("renders the dropdown with header and options", () => {
    expect.hasAssertions();
    render(
      <Dropdown
        headerLeft="Header Left"
        headerRight="Header Right"
        options={mockOptions}
      />,
    );

    // Options should not be visible initially
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("shows options when clicked and hides when clicked outside", () => {
    expect.hasAssertions();
    render(<Dropdown headerLeft="Header" options={mockOptions} />);

    const header = screen.getByText("Header");
    fireEvent.click(header);

    // Options should be visible after click
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    // Click outside the dropdown
    fireEvent.mouseDown(document.body);

    // Options should be hidden again
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("renders custom component options", () => {
    expect.hasAssertions();
    const CustomComponent = ({ text }: { text: string }) => <div>{text}</div>;
    const customOptions = [
      {
        component: CustomComponent,
        attributes: { text: "Custom Option" },
      },
    ];

    render(<Dropdown headerLeft="Header" options={customOptions} />);

    const header = screen.getByText("Header");
    fireEvent.click(header);

    expect(screen.getByText("Custom Option")).toBeInTheDocument();
  });
});
