export function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str as any) &&
    !isNaN(parseFloat(str))
}