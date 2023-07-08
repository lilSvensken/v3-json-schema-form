import schemaForm from "./schema-form/schema-form.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

function createSchemaForm(app, props) {
  const component = createApp(schemaForm, props);
  const pinia = createPinia();
  component.use(pinia);
  component.mount(app);
}

window.createSchemaForm = createSchemaForm;
export default createSchemaForm;
