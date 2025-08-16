export function toSmallTicker (ticker: string) {
  return ticker.toLowerCase().slice(0, 3)
}