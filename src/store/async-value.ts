import { IStatusValue } from "@store/status-value";

export enum FormStatus {
  Loading = "loading",
  Clean = "clean",
  Dirty = "dirty",
  Saving = "saved",
  Error = "error"
}

export interface IAsyncValue<TValue = string, TError = string>
  extends IStatusValue<TValue, TError> {
  loading?: boolean;
  status?: FormStatus;
}
