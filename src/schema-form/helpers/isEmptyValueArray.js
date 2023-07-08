/**
 * невалидно, если массив равен: [] OR [undefined] OR [undefined, <...undefined>]
 * @param arr - Array, который нужно проверить
 * @returns {boolean}
 */
export function isEmptyValueArray(arr) {
  return !arr.every((val) => val === undefined || val === "");
}
