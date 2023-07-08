import { getErrorRequired } from "@/schema-form/helpers/commonErrorsMessages";
import { genitiveCasePluralize } from "@/schema-form/helpers/pluralize";

/**
 * getFileErrorMessage() - возвращает сообщения ошибок для файлов
 * @property - property schema файла
 * @formControl - значение инпута/контрола
 * @isRequired - Boolean, обязательное ли поле
 * @customErrors - Object, поле с кастомными сообщениями об ошибках
 * @onlyFirst - получать `только первое` сообщение об ошибке (по дефолту отдаёт массив ошибок)
 */

export function getFileErrorMessage(
  property,
  formControl,
  isRequired,
  customErrors,
  onlyFirst
) {
  const errorsList = [];
  const multiple = property.type === "array";
  if (
    isRequired &&
    ((multiple && !formControl?.length) || (!multiple && !formControl))
  ) {
    if (customErrors && customErrors["required"]) {
      errorsList.push(customErrors["required"]);
    } else {
      errorsList.push(getErrorRequired());
    }
  }

  const minItems = property.minItems;
  if (minItems && formControl.length < minItems) {
    errorsList.push(
      `Не менее ${minItems} ${genitiveCasePluralize("файл", minItems)}`
    );
  }

  const maxItems = property.maxItems;
  if (maxItems && formControl.length > maxItems) {
    errorsList.push(
      `Не более ${maxItems} ${genitiveCasePluralize("файл", maxItems)}`
    );
  }

  if (onlyFirst) {
    return errorsList[0];
  } else {
    return errorsList;
  }
}
