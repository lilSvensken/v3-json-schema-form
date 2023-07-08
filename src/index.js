import SchemaForm from "@/schema-form/schema-form.vue";
import { createPinia } from "pinia";
import "@/schema-form/styles/index.scss";
import createSchemaForm from "./schema-form";

export default {
  install: (app) => {
    // for vue3
    app.use(createPinia());
    app.component("SchemaForm", SchemaForm);
    // for JS
    app.config.globalProperties.$myFunction = createSchemaForm;
  },
};
