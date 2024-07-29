import NotificationCard from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("notification card", () => {
  const mockProperties = {
    id: "1",
    image: "/test-image.jpg",
    createdAt: "2023-05-01T12:00:00Z",
    message: "Test notification message",
  };

  it("renders notification card without links", () => {
    expect.hasAssertions();
    render(<NotificationCard {...mockProperties} />);

    expect(screen.getByText("Test notification message")).toBeInTheDocument();
    expect(screen.getByText("May 01")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders notification card with links", () => {
    expect.hasAssertions();
    const mockLinks = [
      { onClick: vi.fn(), label: "Link 1" },
      { onClick: vi.fn(), label: "Link 2" },
    ];

    render(<NotificationCard {...mockProperties} links={mockLinks} />);

    expect(screen.getByText("Test notification message")).toBeInTheDocument();
    expect(screen.getByText("May 01")).toBeInTheDocument();

    const linkButtons = screen.getAllByRole("button");
    expect(linkButtons).toHaveLength(2);
    expect(linkButtons[0]).toHaveTextContent("Link 1");
    expect(linkButtons[1]).toHaveTextContent("Link 2");

    fireEvent.click(linkButtons[0]);
    expect(mockLinks[0].onClick).toHaveBeenCalledTimes(1);

    fireEvent.click(linkButtons[1]);
    expect(mockLinks[1].onClick).toHaveBeenCalledTimes(1);
  });
});
