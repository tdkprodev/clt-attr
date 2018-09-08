type Diff<
  TKey1 extends string,
  TKey2 extends string,
  > = (
    { [key in TKey1]: key } &
    { [key in TKey2]: never } &
    { [key: string]: never }
  )[TKey1];

export type Omit<
  TType,
  TOmitKeys extends keyof TType
  > = {
    [key in Diff<Extract<keyof TType, string>, Extract<TOmitKeys, string>>]: TType[key]
  };

  /** Had to set tsconfig "keyofStringsOnly": true 
   * 
   * TypeScript 2.9 breaking changes
   * keyof now includes string, number, and symbol
   * 
   * The other option:
   * 
   * Extract<keyof TType, string>
   * and
   * Extract<TOmitKeys, string>
   */