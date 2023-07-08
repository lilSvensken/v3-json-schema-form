import { isArray } from "@/schema-form/helpers/types";
import { isEmptyValueArray } from "@/schema-form/helpers/isEmptyValueArray";

export function isValidByDependencies(formData, dependencies) {
  let isValid = true;
  dependencies.forEach((dependItem) => {
    const path = dependItem.path?.split("#/")[1].split("/");
    if (!path) return true;

    const dependVal = path.reduce((acc, curr) => {
      return acc ? acc[curr] : undefined;
    }, formData);

    const noEmpty = dependItem.conditions.noEmpty;
    const validList = dependItem.conditions.validList;
    const minimum = dependItem.conditions.minimum;
    const maximum = dependItem.conditions.maximum;

    if (noEmpty) {
      if (!dependVal) {
        isValid = false;
      } else if (isArray(dependVal)) {
        isValid = isEmptyValueArray(dependVal);
      }
    }

    if (validList && !validList.includes(dependVal)) {
      isValid = false;
    }

    if (minimum && dependVal < minimum) {
      isValid = false;
    }

    if (maximum && dependVal > maximum) {
      isValid = false;
    }
  });

  return isValid;
}
