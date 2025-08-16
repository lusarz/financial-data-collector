type UrlParamValue =
  | number
  | string
  | null
  | undefined
  | Set<string>
  | Array<string>

export function buildUrl(
  url: string,
  params: Record<string, UrlParamValue>
): string {
  const urlObj = new URL(url, "https://example.com") // dummy base for relative URLs
  const searchParams = new URLSearchParams(urlObj.search)

  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return // skip null or undefined

    let stringified: string | null = null

    if (Array.isArray(value)) {
      if (value.length > 0) {
        stringified = value.join(",")
      }
    } else if (value instanceof Set) {
      const arr = Array.from(value)
      if (arr.length > 0) {
        stringified = arr.join(",")
      }
    } else {
      stringified = String(value).trim()
      if (stringified === "") return // skip empty string
    }

    if (stringified !== null) {
      searchParams.set(key, stringified)
    }
  })

  urlObj.search = searchParams.toString()

  const isAbsolute = /^https?:\/\//i.test(url)

  if (isAbsolute) {
    return urlObj.toString()
  } else {
    return urlObj.pathname + (urlObj.search ? `?${urlObj.searchParams.toString()}` : "")
  }
}
