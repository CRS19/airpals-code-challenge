import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSearchPlaceInput } from "./useSearchPlaceInput";

describe("useSearchPlaceInput - tests", () => {
  test("When setShowModal is called with true, then openModal state should be true", () => {
    const { result } = renderHook(() => useSearchPlaceInput());

    act(() => {
      result.current.setShowModal(true);
    });

    expect(result.current.openModal).toBe(true);
  });

  test("When setShowModal is called with false, then openModal state should be false", () => {
    const { result } = renderHook(() => useSearchPlaceInput());

    act(() => {
      result.current.setShowModal(false);
    });

    expect(result.current.openModal).toBe(false);
  });
});
