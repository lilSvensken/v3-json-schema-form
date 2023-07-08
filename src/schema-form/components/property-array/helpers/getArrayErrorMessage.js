/**
 * getArrayErrorMessage() - возвращает сообщения ошибок для узлов-массивов
 * @schema - schema узла
 * @formControl - значение инпута/контрола
 * @onlyFirst - получать `только первое` сообщение об ошибке (по дефолту отдаёт массив ошибок)
 */

import { genitiveCasePluralize } from "@/schema-form/helpers/pluralize";

export function getArrayErrorMessage(schema, formControl, onlyFirst) {
  const errorsList = [];
  const minItems = schema.minItems;
  if (minItems && formControl.length < minItems) {
    return `Не менее ${minItems} ${genitiveCasePluralize("элемент", minItems)}`;
  }

  const maxItems = schema.maxItems;
  if (maxItems && formControl.length > maxItems) {
    return `Не более ${maxItems} ${genitiveCasePluralize("элемент", maxItems)}`;
  }

  if (onlyFirst) {
    return errorsList[0];
  } else {
    return errorsList;
  }
}
