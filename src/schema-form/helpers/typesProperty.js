export function isObjectProperty(property) {
  return property.type === "object";
}

export function isArrayProperty(property) {
  return (
    property.type === "array" &&
    !property.enum &&
    getInputType(property) !== "file"
  );
}

export function isCheckboxesProperty(property) {
  if (isSelectProperty(property)) {
    return false;
  }
  return property.enum && property.type === "array";
}

export function isRadiosProperty(property) {
  if (isSelectProperty(property)) {
    return false;
  }
  return property.enum && property.type !== "array";
}

export function isSelectProperty(property) {
  return property.ui?.inputType === "select";
}

export function isToggleProperty(property) {
  return property.type === "boolean" && !property.enum;
}

export function getInputType(property) {
  return property.ui?.inputType;
}
