export const capitalize = (str: string) => {
  if (typeof str !== "string") {
    return ""
  }
  str = str.trim()
  if (str.length === 0) {
    return ""
  }
  return `${str[0].toUpperCase()}${str.substr(1)}`
}
