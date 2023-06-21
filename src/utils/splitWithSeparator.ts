export const splitWithSeparator = (input: string, separator: string): string[] => {
  const lowerCaseInput = input.toLowerCase()
  const lowerCaseSeparator = separator.toLowerCase()

  const segments = lowerCaseInput.split(lowerCaseSeparator)

  const result = segments.reduce<string[]>((acc, segment, i, array) => {
    const originalCasedSegment = input.slice(acc.join('').length, acc.join('').length + segment.length)
    if (i < array.length - 1) {
      acc.push(originalCasedSegment)
      acc.push(separator)
    } else {
      acc.push(originalCasedSegment)
    }

    return acc
  }, [])

  return result
}
