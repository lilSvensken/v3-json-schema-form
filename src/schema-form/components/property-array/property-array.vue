<template>
  <div class="error-container">
    <div
      class="property-array valid-control"
      :class="{ ['valid-control--error']: getErrorMessage }"
    >
      <main-title :text="schema.title" />
      <main-description :text="schema.description" />
      <ul class="property-array__container">
        <li
          v-for="(item, index) in formControl"
          :key="index"
          class="property-array__item"
        >
          <div class="property-array__item-wrapper">
            <property-object
              v-if="isObjectProperty"
              :schema="schema.items"
              :form-control="formControl[index]"
              :full-form-control="fullFormControl[index]"
              :form-data="formData"
              :name-prefix="getNamePrefixByChild(index)"
              @on-change-control="onChangeControl($event, index)"
            />
            <property-array
              v-else-if="isArrayProperty"
              :schema="schema.items"
              :form-arr="formControl[index]"
              :full-form-control="fullFormControl[index]"
              :form-data="formData"
              :name-prefix="getNamePrefixByChild(index)"
              @on-change-control="onChangeControl($event, index)"
            />
            <property
              v-else
              :property="schema.items"
              :value="item"
              :name="getNamePrefixByChild(index)"
              @on-change-control="onChangeControl($event, index)"
            />
            <button
              type="button"
              class="property-array__remove-btn"
              @click="removeItem(index)"
            >
              x
            </button>
          </div>
        </li>
      </ul>

      <div class="property-array__btn-add-wrapper">
        <button type="button" class="property-array__btn-add" @click="addItem">
          +
        </button>
      </div>

      <div v-if="getErrorMessage" class="error-message">
        {{ getErrorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Property from "@/schema-form/components/property/property.vue";
import PropertyObject from "@/schema-form/components/property-object/property-object.vue";
import MainTitle from "@/schema-form/components/common/main-title/main-title.vue";
import MainDescription from "@/schema-form/components/common/main-description/main-description.vue";
import { getModelBySchema } from "@/schema-form/helpers/getModelBySchema";
import {
  isArrayProperty,
  isObjectProperty,
} from "@/schema-form/helpers/typesProperty";
import { useErrorsStore } from "@/schema-form/stores/errors.store";
import { useSubmitStore } from "@/schema-form/stores/submit.store";
import { getArrayErrorMessage } from "@/schema-form/components/property-array/helpers/getArrayErrorMessage";

export default {
  name: "property-array",
  components: { MainDescription, MainTitle, PropertyObject, Property },
  props: {
    schema: Object,
    formData: Object,
    formArr: Array,
    fullFormControl: Object,
    currentForm: Object,
    namePrefix: String,
  },
  emits: ["onChangeControl"],
  data() {
    return {
      formControl: this.formArr,
    };
  },
  setup() {
    const storeErrors = useErrorsStore();
    const storeSubmit = useSubmitStore();
    return { storeErrors, storeSubmit };
  },
  watch: {
    formArr(newFormArr) {
      this.formControl = newFormArr;
    },
    isSubmitStatus() {
      this.checkValid();
    },
  },
  methods: {
    checkValid() {
      const error = getArrayErrorMessage(this.schema, this.formControl, true);
      if (error) {
        this.storeErrors.setError(this.namePrefix, error);
      } else {
        this.storeErrors.deleteError(this.namePrefix);
      }
    },
    addItem() {
      const formModel = getModelBySchema(this.schema.items);
      this.formControl.push(formModel);
      this.checkValid();
    },
    removeItem(index) {
      this.formControl.splice(index, 1);
      this.checkValid();
    },
    getNamePrefixByChild(index) {
      return `${this.namePrefix}_${index}`;
    },
    onChangeControl(newValue, index) {
      const newControlValue = this.formArr;
      newControlValue[index] = newValue;
      this.$emit("onChangeControl", newControlValue);
    },
  },
  computed: {
    isObjectProperty() {
      return isObjectProperty(this.schema.items);
    },
    isArrayProperty() {
      return isArrayProperty(this.schema.items);
    },
    isSubmitStatus() {
      return this.storeSubmit.isSubmit;
    },
    getErrorMessage() {
      return this.storeErrors.getErrors[this.namePrefix];
    },
  },
};
</script>

<style scoped src="./style.scss"></style>
