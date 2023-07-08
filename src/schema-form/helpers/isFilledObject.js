/**
 * Проверка, если объект пуст (не имеет ни одного поля)
 * */

export function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
