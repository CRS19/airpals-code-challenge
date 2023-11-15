import { cleanup, render, screen } from "@testing-library/react";
import { describe, test, expect, afterEach, vi } from "vitest";
import { InfoModal } from "./InfoModal";
import { MODAL_TEXTS } from "../../constants/ModalTexts";
import userEvent from "@testing-library/user-event";

describe("InfoModal tests - ", () => {
  afterEach(() => {
    cleanup();
  });

  test("When modal is displayed and user clicks on Close Button, then modal should be hidden", async () => {
    let showModal = true;
    const user = userEvent.setup();

    const { rerender } = render(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect(screen.getByText(MODAL_TEXTS.validZipCode.title)).toBeDefined();
    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-100"
    );

    const closeBtn = await screen.findByTestId("close-btn");

    await user.click(closeBtn);

    rerender(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-0"
    );
  });

  test("When modal is displayed and user clicks on Undestood Button, then modal should be hidden", async () => {
    let showModal = true;
    const user = userEvent.setup();

    const { rerender } = render(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect(screen.getByText(MODAL_TEXTS.validZipCode.title)).toBeDefined();
    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-100"
    );

    const closeBtn = await screen.findByTestId("undestood-btn");

    await user.click(closeBtn);

    rerender(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-0"
    );
  });

  test("When modal is displayed and user clicks outside of the modal content, then modal should be hidden", async () => {
    let showModal = true;
    const user = userEvent.setup();

    const { rerender } = render(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect(screen.getByText(MODAL_TEXTS.validZipCode.title)).toBeDefined();
    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-100"
    );

    const closeBtn = await screen.findByTestId("modal-testid");

    await user.click(closeBtn);

    rerender(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-0"
    );
  });

  test("When modal is displayed and user clicks on modal content, then modal should not be hidden", async () => {
    let showModal = true;
    const user = userEvent.setup();

    const { rerender } = render(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect(screen.getByText(MODAL_TEXTS.validZipCode.title)).toBeDefined();
    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-100"
    );

    const closeBtn = await screen.findByTestId("modal-content-testid");

    await user.click(closeBtn);

    rerender(
      <InfoModal
        showModal={showModal}
        setShowModal={vi.fn().mockImplementation((openCloseModal) => {
          showModal = openCloseModal;
        })}
        modalTexts={MODAL_TEXTS.validZipCode}
      />
    );

    expect((await screen.findByTestId("modal-testid")).className).contains(
      "opacity-100"
    );
  });
});
