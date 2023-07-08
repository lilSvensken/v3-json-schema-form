/**
 * schemaDeployment() проходит в рекурсии по всем узлам schema и "импортирует" $ref по его ссылке на definitions
 * */

export function schemaDeployment(schema, definitions) {
  if (schema.properties) {
    Object.entries(schema.properties).forEach(([key, value]) => {
      schema.properties[key] = schemaDeployment(value, definitions);
    });
  } else if (schema.items) {
    schema.items = schemaDeployment(schema.items, definitions);
  } else {
    if (schema.$ref) {
      const path = schema.$ref.split("#/definitions/")[1].split("/");
      let field;
      path.forEach((key) => {
        field = field ? field[key] : definitions[key];
      });
      delete schema.$ref;
      schema = { ...schema, ...field };
    }
    return schema;
  }

  return schema;
}
