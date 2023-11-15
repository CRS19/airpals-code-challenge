import { describe, test, expect, afterEach, beforeEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { AUTOCOMPLETE_MOCK_RESPONSE_DATA } from "../constants/TestData";

describe("App tests - ", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("App should be rendered with correct texts and form input", async () => {
    render(<App />);

    //screen.debug();

    expect(screen.getByText("Where are you located?")).toBeDefined();
    expect(
      screen.getByText("So we know where to drop off the stuff")
    ).toBeDefined();
    expect(screen.getByText("We won't share you adress")).toBeDefined();
    expect(screen.getByText("With your ex(or whoever).")).toBeDefined();

    const form = await screen.findByTestId("form-testid");
    expect(form).toBeDefined();

    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.findByTestId("input-address-testid")).toBeDefined();
  });

  test("when user types in the input, the autocomplete list should be rendered with 5 elements", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(AUTOCOMPLETE_MOCK_RESPONSE_DATA),
      } as Response);
    });

    render(<App />);

    const input = await screen.getByRole("textbox");
    expect(input).toBeDefined();

    await user.type(input, "123");

    const responseList = await screen.findByRole("list");
    console.log(responseList.childNodes.length);

    expect(responseList).toBeDefined();
    await waitFor(
      () => expect(responseList.childNodes.length).to.be.equals(5),
      {
        timeout: 2000,
      }
    );
  });
});
