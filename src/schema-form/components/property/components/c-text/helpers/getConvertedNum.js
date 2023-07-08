export function changeDependingOnType(propertyType, value) {
  const isNumber = propertyType === "number";
  const isInteger = propertyType === "integer";

  if (isNumber || isInteger) {
    if (value) {
      value = isNumber ? Number(value) : parseInt(value);
    } else {
      value = 0;
    }
  }

  return value;
}
