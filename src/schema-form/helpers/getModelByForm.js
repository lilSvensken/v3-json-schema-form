/**
 * @param fullModel - полная модель, имеющая все контролы, но его значения не приоритеты (дефолтные)
 * @param mainModel - главная модель. Если контрол существует, то оно попадёт в итоговую форму. Если его нет, то
 * в нужный узел подставится дефолтное значение из fullModel
 * @returns {{}|*|*[]} - форма-гибрид, содержащая все поля из fullModel, где в приоритете значения из mainModel
 */
export function getModelByForm(fullModel, mainModel) {
  if (Array.isArray(fullModel)) {
    const arr = [];
    mainModel.forEach((item) => {
      arr.push(getModelByForm(fullModel[0], item));
    });
    return arr;
  } else if (typeof fullModel === "object") {
    const obj = {};
    Object.entries(fullModel).forEach(([key, value]) => {
      const newModel = mainModel[key] ?? value;
      obj[key] = getModelByForm(value, newModel);
    });
    return obj;
  } else {
    return mainModel ?? fullModel;
  }
}
