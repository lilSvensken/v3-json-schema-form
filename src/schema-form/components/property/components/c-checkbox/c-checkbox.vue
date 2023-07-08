<template>
  <label class="checkbox">
    <input
      ref="input"
      type="checkbox"
      class="checkbox__input"
      :value="value"
      :name="name"
      :checked="checked"
    />
    <span
      class="checkbox__content valid-field"
      :class="{ ['valid-field--error']: isError }"
    ></span>
    <span class="checkbox__caption">{{ caption }}</span>
  </label>
</template>

<script>
export default {
  name: "c-checkbox",
  props: {
    value: [String, Number, Boolean],
    name: String,
    checked: Boolean,
    caption: [String, Number, Boolean],
    isError: Boolean,
  },
  emits: ["mountedRef"],
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
