import { describe, test, expect, afterEach, beforeEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import {
  AUTOCOMPLETE_MOCK_RESPONSE_DATA,
  DETAILS_MOCK_RESPONSE_DATA,
  VALID_ADDRESS_DETAILS_RESPONSE,
  VALID_ADDRESS_DETAILS_WITH_OUT_ZIPCODE_RESPONSE,
  VALID_ZIP_CODE_ADDRESS_AUTOCOMPLETE_RESPONSE,
} from "../constants/TestData";
import { MODAL_TEXTS } from "../constants/ModalTexts";

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
    expect(screen.getByText("We won't share you address")).toBeDefined();
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

    expect(responseList).toBeDefined();
    await waitFor(
      () => expect(responseList.childNodes.length).to.be.equals(5),
      {
        timeout: 2000,
      }
    );
  });

  test("when user gets autocomplete options of '1600 Amphi' and clicks on one of then, the input should be filled with the selected option, the zip code should be validated and popup should be displayed with invalid texts", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(AUTOCOMPLETE_MOCK_RESPONSE_DATA),
      } as Response);
    });

    render(<App />);

    const input: HTMLElement & { value: string } = screen.getByRole("textbox");
    expect(input).toBeDefined();

    await user.type(input, "1600 Amphi");

    const responseList = await screen.findByRole("list");

    expect(responseList).toBeDefined();
    await waitFor(
      () => expect(responseList.childNodes.length).to.be.equals(5),
      {
        timeout: 2000,
      }
    );

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(DETAILS_MOCK_RESPONSE_DATA),
      } as Response);
    });

    const firstListItem = await screen.findByTestId("autocomplete-testid-0");

    await user.click(firstListItem);

    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.title)).toBeDefined();
    expect(
      screen.getByText(MODAL_TEXTS.invalidZipCode.callToAction)
    ).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.subTitle)).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.btnText)).toBeDefined();
    expect(input.value).to.be.eqls(
      AUTOCOMPLETE_MOCK_RESPONSE_DATA.predictions[0].description
    );
  });

  test("when user gets autocomplete options of '10138 NY' and clicks on one of then, the input should be filled with the selected option, the zip code should be validated and popup should be displayed with valid texts", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(VALID_ZIP_CODE_ADDRESS_AUTOCOMPLETE_RESPONSE),
      } as Response);
    });

    render(<App />);

    const input: HTMLElement & { value: string } = screen.getByRole("textbox");
    expect(input).toBeDefined();

    await user.type(input, "10138 NY");

    const responseList = await screen.findByRole("list");

    expect(responseList).toBeDefined();
    await waitFor(
      () => expect(responseList.childNodes.length).to.be.equals(5),
      {
        timeout: 2000,
      }
    );

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(VALID_ADDRESS_DETAILS_RESPONSE),
      } as Response);
    });

    const firstListItem = await screen.findByTestId("autocomplete-testid-0");

    await user.click(firstListItem);

    expect(screen.getByText(MODAL_TEXTS.validZipCode.title)).toBeDefined();
    expect(
      screen.getByText(MODAL_TEXTS.validZipCode.callToAction)
    ).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.validZipCode.subTitle)).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.validZipCode.btnText)).toBeDefined();
    expect(input.value).to.be.eqls(
      VALID_ZIP_CODE_ADDRESS_AUTOCOMPLETE_RESPONSE.predictions[0].description
    );
  });

  test("when user gets autocomplete options of some direction but details does not have zipcode, then the input should be filled with the selected option, the zip code should be validated and popup should be displayed with invalid texts", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(VALID_ZIP_CODE_ADDRESS_AUTOCOMPLETE_RESPONSE),
      } as Response);
    });

    render(<App />);

    const input: HTMLElement & { value: string } = screen.getByRole("textbox");
    expect(input).toBeDefined();

    await user.type(input, "10138 NY");

    const responseList = await screen.findByRole("list");

    expect(responseList).toBeDefined();
    await waitFor(
      () => expect(responseList.childNodes.length).to.be.equals(5),
      {
        timeout: 2000,
      }
    );

    vi.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(VALID_ADDRESS_DETAILS_WITH_OUT_ZIPCODE_RESPONSE),
      } as Response);
    });

    const firstListItem = await screen.findByTestId("autocomplete-testid-0");

    await user.click(firstListItem);

    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.title)).toBeDefined();
    expect(
      screen.getByText(MODAL_TEXTS.invalidZipCode.callToAction)
    ).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.subTitle)).toBeDefined();
    expect(screen.getByText(MODAL_TEXTS.invalidZipCode.btnText)).toBeDefined();
    expect(input.value).to.be.eqls(
      VALID_ZIP_CODE_ADDRESS_AUTOCOMPLETE_RESPONSE.predictions[0].description
    );
  });
});
