/**
 * Функция, генерирующая случайную строку
 * @param lengthStr - длинна строки на выходе
 * @returns {string} - строка, состаящая из случайных символов с length = lengthStr
 */

export function generateRandomString(lengthStr = 32) {
  let str = "";
  while (str.length < lengthStr) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, lengthStr);
}
