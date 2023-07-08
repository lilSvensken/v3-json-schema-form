<template>
  <div class="property">
    <span
      v-if="property.title"
      class="property__title"
      :class="[{ 'property__title--required': isRequired }]"
    >
      {{ property.title }}
    </span>
    <span v-if="property.description" class="property__option">
      {{ property.description }}:
    </span>

    <div class="property__item-container error-container">
      <checkboxes-arr
        v-if="isCheckboxesList"
        :checkboxes-arr="property.enum"
        :name="name"
        :value="value"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
      />

      <radios-arr
        v-else-if="isRadiosList"
        :radios-arr="property.enum"
        :value="value"
        :name="name"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
      />

      <c-select
        v-else-if="isSelect"
        :optionsList="property.enum"
        :property-type="property.type"
        :name="name"
        :value="value"
        :required="isRequired"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
        @on-blur="checkValid"
      />

      <c-toggle
        v-else-if="isToggle"
        :value="value"
        :name="name"
        :required="isRequired"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
      />

      <c-range
        v-else-if="inputType === 'range'"
        :property="property"
        :value="value"
        :name="name"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
        @on-blur="checkValid"
      />

      <c-color-picker
        v-else-if="inputType === 'color'"
        :value="value"
        :name="name"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
        @on-blur="checkValid"
      />

      <c-datepicker
        v-else-if="inputType === 'date'"
        :value="value"
        :name="name"
        :required="isRequired"
        :is-error="Boolean(getErrorMessage)"
        @on-change="onChangeControl"
        @mounted-ref="onMountedInputRef"
        @on-blur="checkValid"
      />

      <c-file
        v-else-if="inputType === 'file'"
        :property="property"
        :value="value"
        :name="name"
        :required="isRequired"
        :is-error="Boolean(getErrorMessage)"
        @mounted-ref="onMountedInputRef"
        @on-change="onChangeControl"
      />

      <c-text
        v-else
        :property="property"
        :value="value"
        :name="name"
        :required="isRequired"
        :is-error="!!getErrorMessage"
        @mounted-ref="onMountedInputRef"
        @on-change="onChangeControl"
        @on-blur="checkValid"
      />

      <div v-if="getErrorMessage" class="error-message">
        {{ getErrorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import CText from "@/schema-form/components/property/components/c-text/c-text.vue";
import CSelect from "@/schema-form/components/property/components/c-select/c-select.vue";
import {
  getInputType,
  isCheckboxesProperty,
  isRadiosProperty,
  isSelectProperty,
  isToggleProperty,
} from "@/schema-form/helpers/typesProperty";
import CFile from "@/schema-form/components/property/components/c-file/c-file.vue";
import { getInputErrorMessage } from "@/schema-form/components/property/helpers/getInputErrorMessage";
import { useErrorsStore } from "@/schema-form/stores/errors.store";
import { useSubmitStore } from "@/schema-form/stores/submit.store";
import CheckboxesArr from "@/schema-form/components/property/components/checkboxes-arr/checkboxes-arr.vue";
import CDatepicker from "@/schema-form/components/property/components/c-datepicker/c-datepicker.vue";
import { getFileErrorMessage } from "@/schema-form/components/property/helpers/getFileErrorMessage";
import { getCheckboxesListErrorMessage } from "@/schema-form/components/property/helpers/getCheckboxesListErrorMessage";
import { convertValueByType } from "@/schema-form/components/property/helpers/convertValueByType";
import { getSelectErrorMessage } from "@/schema-form/components/property/helpers/getSelectErrorMessage";
import RadiosArr from "@/schema-form/components/property/components/radios-arr/radios-arr.vue";
import { getRadiosListErrorMessage } from "@/schema-form/components/property/helpers/getRadiosListErrorMessage";
import CToggle from "@/schema-form/components/property/components/c-toggle/c-toggle.vue";
import CRange from "@/schema-form/components/property/components/c-range/c-range.vue";
import CColorPicker from "@/schema-form/components/property/components/c-color-picker/c-color-picker.vue";

export default {
  name: "property",
  components: {
    CColorPicker,
    CRange,
    CToggle,
    RadiosArr,
    CDatepicker,
    CheckboxesArr,
    CFile,
    CSelect,
    CText,
  },
  props: {
    property: Object,
    propertyKey: String,
    value: [String, Number, Array, Boolean, File],
    name: String,
    keyName: String,
  },
  emits: ["onChangeControl"],
  data() {
    return {
      inputRef: undefined,
    };
  },
  setup() {
    const storeErrors = useErrorsStore();
    const storeSubmit = useSubmitStore();
    return { storeErrors, storeSubmit };
  },
  watch: {
    isSubmitStatus() {
      this.checkValid(this.value);
    },
  },
  methods: {
    onMountedInputRef(inputRef) {
      this.inputRef = inputRef;
    },
    checkValid(newValue) {
      let error;
      const isRequired = this.isRequired;
      const customErrors = this.property.customErrors;
      if (this.inputType === "file") {
        error = getFileErrorMessage(
          this.property,
          newValue,
          isRequired,
          customErrors,
          true
        );
      } else if (this.isCheckboxesList) {
        error = getCheckboxesListErrorMessage(
          newValue,
          isRequired,
          customErrors,
          true
        );
      } else if (this.isRadiosList) {
        error = getRadiosListErrorMessage(
          newValue,
          isRequired,
          customErrors,
          true
        );
      } else if (this.isSelect) {
        error = getSelectErrorMessage(newValue, isRequired, customErrors, true);
      } else {
        error = getInputErrorMessage(this.inputRef, this.property, true);
      }

      if (error) {
        this.storeErrors.setError(this.name, error);
      } else {
        this.storeErrors.deleteError(this.name);
      }
    },
    onChangeControl(newValue) {
      const convertValue = convertValueByType(this.property.type, newValue);

      this.$emit("onChangeControl", convertValue);

      if (this.storeSubmit.isLeastOneSubmit || this.getErrorMessage) {
        this.checkValid(convertValue);
      }
    },
  },
  computed: {
    isSubmitStatus() {
      return this.storeSubmit.isSubmit;
    },
    isRequired() {
      return Boolean(this.property.validation?.required);
    },
    getErrorMessage() {
      return this.storeErrors.getErrors[this.name];
    },
    inputType() {
      return getInputType(this.property);
    },
    isToggle() {
      return isToggleProperty(this.property);
    },
    isCheckboxesList() {
      return isCheckboxesProperty(this.property);
    },
    isRadiosList() {
      return isRadiosProperty(this.property);
    },
    isSelect() {
      return isSelectProperty(this.property);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
