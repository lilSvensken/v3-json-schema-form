import { getErrorRequired } from "@/schema-form/helpers/commonErrorsMessages";

/**
 * getSelectErrorMessage() - возвращает сообщения ошибок для select
 * @value - текущее значение контрола чекбоксов (массив)
 * @isRequired - Boolean, обязательное ли поле
 * @customErrors - Object, поле с кастомными сообщениями об ошибках
 * @onlyFirst - получать `только первое` сообщение об ошибке (по дефолту отдаёт массив ошибок)
 */

export function getSelectErrorMessage(
  value,
  isRequired,
  customErrors,
  onlyFirst
) {
  const errorsList = [];
  if (isRequired && !value) {
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
