/**
 * функции возвращают word с правильным окончанием в зависимости от числа count
 * nominativeCasePluralize -
 *    для Именительного падежа (Есть 1 час, 3 минуты, 5 символов и тд)
 * genitiveCasePluralize -
 *    для Родительного падежа (Нет 1 часа, 3 минут, 5 символов и тд)
 * */

const RULES = {
  // 1 | 2 | 5
  ["час"]: ["час", "часа", "часов"],
  ["минуту"]: ["минуту", "минуты", "минут"],
  ["секунду"]: ["секунду", "секунды", "секунд"],
  ["символ"]: ["символ", "символа", "символов"],
  ["элемент"]: ["элемент", "элемента", "элементов"],
  ["файл"]: ["файл", "файла", "файлов"],
};

export function nominativeCasePluralize(word, count) {
  const titles = RULES[word];
  const cases = [2, 0, 1, 1, 1, 2];
  count = Math.abs(+count);
  if (count === 0) {
    return titles[2];
  } else if (Math.round(count) === +count) {
    if (+count < 1) {
      return titles[1];
    }
    count = Math.round(Math.abs(count));

    return titles[
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
    ];
  } else {
    return titles[1];
  }
}

export function genitiveCasePluralize(word, count) {
  if (count !== 11 && String(count).at(-1) === "1") {
    return RULES[word][1];
  } else {
    return RULES[word][2];
  }
}
