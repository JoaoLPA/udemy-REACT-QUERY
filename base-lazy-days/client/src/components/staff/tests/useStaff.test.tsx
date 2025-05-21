import { act, renderHook, waitFor } from "@testing-library/react";

import { useStaff } from "../hooks/useStaff";

import { createQueryClientWrapper } from "@/test-utils";

test("filter staff", async () => {
  const { result } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() => {
    expect(result.current.staff.length).toBeGreaterThanOrEqual(4);
  });

  console.log("staff", result.current.staff.length);

  act(() => result.current.setFilter("scrub"));

  console.log("filtered", result.current.staff.length);

  await waitFor(() => {
    expect(result.current.staff.length).toBe(2);
  });
});
