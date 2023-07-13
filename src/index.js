import "@/schema-form/styles/index.scss";
import createSchemaForm from "./schema-form";

export default {
  install: (app) => {
    app.config.globalProperties.$myFunction = createSchemaForm;
  },
};
