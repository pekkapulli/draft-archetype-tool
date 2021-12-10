export interface Selections {}

export const partialUpdate = <T>(original: T, update: Partial<T>): T => ({
  ...original,
  ...update,
});
