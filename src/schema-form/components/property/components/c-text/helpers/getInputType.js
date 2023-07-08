export function getInputType(property) {
  if (property.type === "integer" || property.type === "number") {
    return "number";
  } else if (property.format === "email") {
    return "email";
  } else if (property.type) {
    return property.type;
  } else {
    return "string";
  }
}
