import { act, renderHook, waitFor } from "@testing-library/react";

import { useAppointments } from "../hooks/useAppointments";
import { AppointmentDateMap } from "../types";

import { createQueryClientWrapper } from "@/test-utils";

const getAppointments = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0
  );

test("filter appointments by availability", async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  await waitFor(() =>
    expect(getAppointments(result.current.appointments)).toBeGreaterThan(0)
  );

  const filteredAppointmentsLength = getAppointments(
    result.current.appointments
  );

  act(() => result.current.setShowAll(true));

  await waitFor(() => {
    expect(getAppointments(result.current.appointments)).toBeGreaterThan(
      filteredAppointmentsLength
    );
  });
});
