import { isArrayProperty } from "@/schema-form/helpers/typesProperty";

export function getModelBySchema(items) {
  const type = items.type;
  switch (type) {
    case "object":
      const obj = {};
      Object.entries(items.properties).forEach(([key, value]) => {
        obj[key] = getModelBySchema(value);
      });
      return obj;

    case "array":
      if (isArrayProperty(items)) {
        return [getModelBySchema(items.items)];
      }
      // здесь чекбокс имеет тип "array", но по факту является финальным элементом ветви (массив файлов/чекбоксов/draggable)
      return items.default || [];

    case "boolean":
      return items.default || false;

    case "number":
      return items.default || 0;

    default:
      return items.default;
  }
}
