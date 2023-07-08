<template>
  <label class="field">
    <textarea
      ref="input"
      v-if="inputType === 'textarea'"
      :value="value"
      :name="name"
      :placeholder="ui?.placeholder"
      :required="required"
      :rows="ui?.rows"
      :minlength="validation?.minlength"
      :maxlength="validation?.maxlength"
      :autofocus="ui?.autofocus"
      :class="{ ['valid-field--error']: isError }"
      @blur="onBlur"
      @input="onChange"
    />
    <input
      v-else
      ref="input"
      :type="inputType || property.type"
      :value="value"
      :name="name"
      :placeholder="ui?.placeholder"
      :required="required"
      :min="validation?.minimum"
      :max="validation?.maximum"
      :minlength="validation?.minlength"
      :maxlength="validation?.maxlength"
      :autofocus="ui?.autofocus"
      v-imask="ui?.mask"
      class="field__input"
      :class="{ ['field__input--error']: isError }"
      @blur="onBlur"
      @input="onChange"
    />
  </label>
</template>

<script>
import { changeDependingOnType } from "@/schema-form/components/property/components/c-text/helpers/getConvertedNum";
import { IMaskDirective } from "vue-imask";
import { getInputType } from "@/schema-form/helpers/typesProperty";

export default {
  name: "c-text",
  props: {
    property: Object,
    value: [String, Number],
    name: String,
    required: Boolean,
    isError: Boolean,
  },
  emits: ["mountedRef", "onChange", "onBlur"],
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
  methods: {
    onBlur(e) {
      this.$emit("onBlur", e.target.value);
    },
    onChange(e) {
      let value = e.target.value;
      value = changeDependingOnType(this.property.type, value);
      this.$emit("onChange", value);
    },
  },
  computed: {
    inputType() {
      return getInputType(this.property);
    },
    validation() {
      return this.property.validation;
    },
    ui() {
      return this.property.ui;
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
