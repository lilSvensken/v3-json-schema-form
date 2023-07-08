<template>
  <select
    ref="select"
    :name="name"
    class="select valid-field"
    :class="{ ['valid-field--error']: isError }"
    @change="onChange"
    @blur="onBlur"
  >
    <option value="" selected>(не выбрано)</option>
    <option
      v-for="option in optionsList"
      :key="getValue(option)"
      :value="getValue(option)"
      :selected="isSelected(option.value)"
      :disabled="option.disabled"
    >
      {{ getCaption(option) }}
    </option>
  </select>
</template>

<script>
import { changeDependingOnType } from "@/schema-form/components/property/components/c-text/helpers/getConvertedNum";

export default {
  name: "c-select",
  props: {
    value: [String, Number],
    optionsList: Array,
    propertyType: String,
    name: String,
    isError: Boolean,
  },
  emits: ["mountedRef", "onChange", "onBlur"],
  mounted() {
    this.$emit("mountedRef", this.$refs["select"]);
  },
  methods: {
    getValue(item) {
      return item.value ? item.value : item;
    },
    getCaption(item) {
      return item.caption ? item.caption : item;
    },
    isSelected(itemValue) {
      return this.value === itemValue;
    },
    onBlur(e) {
      this.$emit("onBlur", e.target.value);
    },
    onChange(e) {
      let value = e.target.value;
      value = changeDependingOnType(this.propertyType, value);
      this.$emit("onChange", value);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
