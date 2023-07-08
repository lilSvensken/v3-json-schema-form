/**
 * getInputErrorMessage() - возвращает сообщения ошибок для обычных инпутов, у которых есть validity
 * @inputRef - html элемент input, на котором были повешены атрибуты валидации
 * @property - property узла
 * @onlyFirst - получать `только первое` сообщение об ошибке (по дефолту отдаёт массив ошибок)
 */

import {
  getErrorHardValue,
  getErrorMax,
  getErrorMaxlength,
  getErrorMin,
  getErrorMinlength,
  getErrorRequired,
} from "@/schema-form/helpers/commonErrorsMessages";

const ERROR_CODE_MAP = {
  ["rangeOverflow"]: "maximum",
  ["rangeUnderflow"]: "minimum",
  ["tooLong"]: "maxlength",
  ["tooShort"]: "minlength",
  ["valueMissing"]: "required",
};

export function getInputErrorMessage(
  inputRef,
  { validation, customErrors },
  onlyFirst
) {
  const errorsList = [];
  const validity = inputRef.validity;

  if (!validity.valid) {
    for (let key in validity) {
      if (validity[key]) {
        const errCode = ERROR_CODE_MAP[key];
        if (errCode) {
          const customMessage = customErrors ? customErrors[errCode] : null;
          if (customMessage) {
            errorsList.push(customMessage);
          } else {
            const defaultError = setDefaultError(errCode, inputRef);
            if (defaultError) errorsList.push(defaultError);
          }
        }
      }
    }
  }
  const errorHard = checkErrorHardValue(validation, inputRef);
  if (errorHard) errorsList.push(errorHard);

  if (onlyFirst) return errorsList[0];
  return errorsList;
}

function setDefaultError(errCode, inputRef) {
  switch (errCode) {
    case "maximum":
      return getErrorMax(inputRef);
    case "minimum":
      return getErrorMin(inputRef);
    case "maxlength":
      return getErrorMaxlength(inputRef);
    case "minlength":
      return getErrorMinlength(inputRef);
    case "required":
      return getErrorRequired(inputRef);
  }

  return null;
}

function checkErrorHardValue(validation, inputRef) {
  const hardValue = validation?.hardValue;
  if (hardValue) {
    if (inputRef.value !== String(hardValue)) {
      return getErrorHardValue(hardValue);
    }
  }

  return null;
}
