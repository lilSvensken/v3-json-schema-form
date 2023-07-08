/**
 * getCheckboxesListErrorMessage() - возвращает сообщения ошибок для списка чекбоксов
 * @value - текущее значение контрола чекбоксов (массив)
 * @isRequired - Boolean, обязательное ли поле
 * @customErrors - Object, поле с кастомными сообщениями об ошибках
 * @onlyFirst - получать `только первое` сообщение об ошибке (по дефолту отдаёт массив ошибок)
 */

import { getErrorRequired } from "@/schema-form/helpers/commonErrorsMessages";

export function getCheckboxesListErrorMessage(
  value,
  isRequired,
  customErrors,
  onlyFirst
) {
  const errorsList = [];
  if (isRequired && !value.length) {
    if (customErrors && customErrors["required"]) {
      errorsList.push(customErrors["required"]);
    } else {
      errorsList.push(getErrorRequired());
    }
  }

  if (onlyFirst) {
    return errorsList[0];
  } else {
    return errorsList;
  }
}
