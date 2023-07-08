export function convertValueByType(type, newValue) {
  let convertValue = newValue;

  switch (type) {
    case "string":
      if (!newValue) convertValue = undefined;
      break;

    case "boolean":
      convertValue = newValue === "true" || newValue === true;
      break;
  }

  return convertValue;
}
