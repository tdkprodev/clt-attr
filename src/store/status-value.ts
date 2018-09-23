export interface IStatusValue<TValue = string, TError = string> {
    error?: TError;
    value: TValue;
}