# json-schema
Library for converting JsonSchema to Form in field validation

For Vue 3 and Vanilla JS

# 📦 Installation
```shell
npm i github:lilSvensken/json-schema-form
```
### Or client-side usage
save locally the files from the  [/lib-to-connect](#https://github.com/lilSvensken/json-schema-form/tree/master/lib-to-connect)
```js
// reset pinia errors and library vue@3.3.2 (dev)
<script src="lib-to-connect/common.js"></script>
// copy /dist/schema-form.umd.js
<script src="lib-to-connect/schema-form.umd.js"></script>
// styles
<link rel="stylesheet" href="lib-to-connect/style.css">
```

# Getting Started

## 🔨 Usage JS
### import module
```js
import SchemaForm from "~/vue3-json-schema-form/dist/schema-form.es.js";
import "~/vue3-json-schema-form/dist/style.css";

const app = document.getElementById("app");
const json = {
	"title": "My Json Schema",
	"type": "object",
	"properties": { "name": { "title": "Имя", "type": "string" } }
};
const formData = { name: "Default Name" };
const props = { schema: json, formData }

SchemaForm;
window.createSchemaForm(app, props);
```
```js
const app = document.getElementById("app");
const json = {
	"title": "My Json Schema",
	"type": "object",
	"properties": { "name": { "title": "Имя", "type": "string" } }
};
const formData = { name: "Default Name" };
const props = { schema: json, formData }
window.createSchemaForm(app, props);
```

# 🔨 Usage Vue-3

```js
// index.js
import App from "./App.vue";
import { createApp } from "vue";
import SchemaForm from "~/vue3-json-schema-form/dist/schema-form.es.js";
import "~/vue3-json-schema-form/dist/style.css";

const app = createApp(App);
app.use(SchemaForm);
app.mount("#app");
```

```html
<!-- component.vue -->
<template>
  <schema-form
    :schema="schema"
    :form-data="form"
    @on-change-form="onChangeForm"
    @onSubmit="onSubmit"
  />
</template>
<script>
  import json from "./json-schema";

  export default {
    name: "component",
    data() {
      return {
        schema: json,
        form: {},
      };
    },
    methods: {
      onChangeForm(newForm) {
        this.form = newForm;
      },
      onSubmit() {
        console.table(this.form);
      },
    },
  };
</script>
```

# schema JSON parameters:

`properties` - An Object with entity fields of the form
- `type` - field value type ("object" or "array" or "string" or "boolean" or "number")
- `title` - the output title of the field/node
- `description` - the output description of the field/node
- `default` - default value
- `properties` - only for type="object". This is an object with the same fields as the parent: type, title, properties, items, etc.
- `items` - only for type="array", This is an object describing an element of the form array, which has the same fields as the parent: type, title, properties, items, etc.

- `validation` - validation field/node:
    - `required` - Boolean. Is it necessary to fill in field/node
    - `minimum` / `maximum` - limiting the value for numbers
    - `minlength` / `maxlength` - limitation of the allowed number of characters
    - `hardValue` - fixed mandatory value
- `ui`:
    - `inputType`:
        * all built-in input types ([view here](http://htmlbook.ru/html/input/type))
        * "select"
        * "textarea"
    - `draggable` - Boolean. Only for inputType="file" - Drag and Drop
    - `autofocus` - Boolean
    - `placeholder` - String
    - `description` - String. Description of the input under the heading
    - `mask` - input mask ({ mask: "+7(000)000-00-00", lazy: true }) (use [vue-imask](https://www.npmjs.com/package/vue-imask) library)
- `customErrors` - Object, in which the keys are the type of error from the validation field, and the value of the field is the text of the custom error
- `enum` - Array with a list of possible values (for types "radio", "checkbox", "select")
  * `["val-1"]` - a one-dimensional array with values. Then the value and the label of the element will be the same
  * `[{ caption: "one", value: 1, disabled: true }]` - multidimensional array, where caption, value are specified specifically

- `grid` - Object - custom item position in the grid
    - `column`(optional parameter) - Number - occupied column (on all screen resolutions)
    - `row`(optional parameter) - Number - occupied row (on all screen resolutions)
    - `media`(optional parameter) - Object of type `{ "768": { column: 1, row: 2 } }` (the key is the width of the screen above which it will be applied
      value (768+)). media permissions can be as many as you want. Has a higher priority than grid.column or grid.row

<hr/>

*Notes*
1) What you need to get radio, checkbox, select:
- for the **radio** list, it is necessary that the node has the field `enum: []`, and the `type` is `string || number || boolean` (if there is
  the default field, then, of the corresponding type `"default": "foo"`)
- for the list of **checkboxes** it is necessary that the node has the field `enum: []`, and the `type` is `array` (if there is
  the default field, then, of the corresponding type `"default": ["foo", "bar"]`)
- for the list of options **select-a** it is necessary that the node has the field `enum: []` and the field `"ui":{"inputType":"select"}`.
    If its `type` is `array`, then it is a multiple-choice selector, if `type` with the value `string||number|| boolean`, then it is a regular select
- if you forget to specify the `enum` field, it will be a completely different type of node

2) **Toggle**
- for a standard toggler, you only need to specify `"type": "boolean"` (`"default": true/false`)
