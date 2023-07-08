<template>
  <label class="color-picker">
    <input
      ref="input"
      type="color"
      :value="value"
      :name="name"
      class="color-picker__input valid-field"
      :class="{ ['valid-field--error']: isError }"
      @blur="onBlur"
      @change="onChange"
    />
  </label>
</template>

<script>
export default {
  name: "c-color-picker",
  props: {
    value: String,
    name: String,
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
      this.$emit("onChange", e.target.value);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
