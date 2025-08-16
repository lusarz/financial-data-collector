export function getLastItem<T>(array: T[]): T | null {
  return array.length > 0 ? array[array.length - 1] : null;
}
