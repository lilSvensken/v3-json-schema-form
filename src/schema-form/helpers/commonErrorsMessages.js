import { genitiveCasePluralize } from "@/schema-form/helpers/pluralize";

export function getErrorMax(input) {
  return `Максимальное значение должно быть не больше ${input.max}`;
}

export function getErrorMin(input) {
  return `Минимальное значение должно быть не меньше ${input.min}`;
}

export function getErrorMaxlength(input) {
  const maxlength = +input.getAttribute("minlength");
  return `Не более ${maxlength} ${genitiveCasePluralize("символ", maxlength)}`;
}

export function getErrorMinlength(input) {
  const minlength = +input.getAttribute("minlength");
  return `Не менее ${minlength} ${genitiveCasePluralize("символ", minlength)}`;
}

export function getErrorRequired() {
  return "Обязательное поле";
}

export function getErrorHardValue(hardValue) {
  return `Значение должно быть равно "${hardValue}"`;
}
