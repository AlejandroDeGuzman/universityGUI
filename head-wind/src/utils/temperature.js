export function convertTemp(temp, unit) {
  return unit === "C"
    ? temp
    : (temp * 9) / 5 + 32;
}