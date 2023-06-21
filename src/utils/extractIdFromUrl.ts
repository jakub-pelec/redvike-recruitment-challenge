export const extractIdFromUrl = (url: string): number | null => {
  const regex = /\/(\d+)\/?$/
  const match = url.match(regex)
  return match ? parseInt(match[1], 10) : null
}
