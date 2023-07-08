export function isObject(value) {
  return typeof value === "object" && !Array.isArray(value);
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isString(value) {
  return typeof value === "string";
}
