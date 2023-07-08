<template>
  <label class="radio">
    <input
      ref="input"
      type="radio"
      class="radio__input"
      :value="value"
      :name="name"
      :checked="checked"
    />
    <span
      class="radio__content valid-field"
      :class="{ ['valid-field--error']: isError }"
    ></span>
    <span class="radio__caption">{{ caption }}</span>
  </label>
</template>

<script>
export default {
  name: "c-radio",
  props: {
    value: [String, Number, Boolean],
    caption: [String, Number, Boolean],
    name: String,
    checked: Boolean,
    isError: Boolean,
  },
  emits: ["mountedRef"],
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
