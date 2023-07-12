import SchemaForm from "@/schema-form/schema-form.vue";
import { createPinia } from "pinia";
import "@/schema-form/styles/index.scss";

export default {
  install: (app) => {
    app.use(createPinia());
    app.component("SchemaForm", SchemaForm);
  },
};
