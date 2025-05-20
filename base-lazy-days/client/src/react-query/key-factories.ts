import { queryKeys } from "./constants";

export function generateUserKey(userId: number) {
  return [queryKeys.user, userId];
}

export function generateUserAppointmentsKey(userId: number, userToken: string) {
  return [queryKeys.appointments, userId, userToken];
}
