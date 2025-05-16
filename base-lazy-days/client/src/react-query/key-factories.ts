import { queryKeys } from "./constants";

export function generateUserKey(userId: number, userToken: string) {
  return [queryKeys.user, userId, userToken];
}

export function generateUserAppointmentsKey(userId: number, userToken: string) {
  return [queryKeys.appointments, userId, userToken];
}
