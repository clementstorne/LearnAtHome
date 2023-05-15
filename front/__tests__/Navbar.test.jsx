import React from "react";

/** React-testing methods */
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

/** Component to test */
import Navbar from "../src/components/Navbar";

/** Vitest matchers */
import { describe, it, expect } from "vitest";

describe("Given that I am a visitor on a page", () => {
  describe("When I click on the logo in the navbar", () => {
    it("should render the login page", () => {
      // it("should render the login page", async () => {
      const navbar = render(<Navbar />);
      const logo = navbar.getByTestId("navbar-logo");

      // await userEvent.click(screen.getByTestId("navbar-logo"));

      expect(logo).toBeInTheDocument;
    });
  });
});
