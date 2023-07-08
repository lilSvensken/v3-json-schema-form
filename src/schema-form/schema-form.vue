<template>
  <form v-if="schema" class="form" @submit="onSubmit" novalidate>
    <property-object
      :schema="schema"
      :form-control="currentForm"
      :full-form-control="fullForm"
      :form-data="formData"
      :name-prefix="'form'"
      @on-change-control="onChangeCurrentForm($event)"
    />

    <button type="submit" class="form__btn-submit">Submit</button>
  </form>
</template>

<script>
import PropertyObject from "@/schema-form/components/property-object/property-object.vue";
import { getModelBySchema } from "@/schema-form/helpers/getModelBySchema";
import { getModelByForm } from "@/schema-form/helpers/getModelByForm";
import { useErrorsStore } from "@/schema-form/stores/errors.store";
import { isEmptyObject } from "@/schema-form/helpers/isFilledObject";
import { useSubmitStore } from "@/schema-form/stores/submit.store";
import { schemaDeployment } from "@/schema-form/helpers/schemaDefinitions";

export default {
  name: "schema-form",
  components: { PropertyObject },
  props: {
    schema: Object,
    formData: Object,
  },
  data() {
    return {
      fullForm: undefined,
      currentForm: undefined,
    };
  },
  created() {
    schemaDeployment(this.schema, this.schema.definitions);
    this.setHybridFullForm();
  },
  emits: ["onChangeForm", "onSubmit"],
  setup() {
    const storeErrors = useErrorsStore();
    const storeSubmit = useSubmitStore();
    return { storeErrors, storeSubmit };
  },
  methods: {
    setHybridFullForm() {
      const defaultForm = {};
      Object.entries(this.schema.properties).forEach(([key, value]) => {
        defaultForm[key] = getModelBySchema(value);
      });
      const hybridForm = getModelByForm(defaultForm, this.formData);
      this.fullForm = structuredClone(hybridForm);
      this.onChangeCurrentForm(hybridForm);
    },
    onChangeCurrentForm(newCurrentForm) {
      this.currentForm = newCurrentForm;
      this.fullForm = newCurrentForm;
      this.$emit("onChangeForm", newCurrentForm);
    },
    onSubmit(event) {
      event.preventDefault();
      this.storeSubmit.setStatusSubmit();
      // из-за watch в дочерних компонентах
      setTimeout(() => {
        const isValidForm = isEmptyObject(this.storeErrors.getErrors);
        if (isValidForm) {
          this.$emit("onSubmit");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
