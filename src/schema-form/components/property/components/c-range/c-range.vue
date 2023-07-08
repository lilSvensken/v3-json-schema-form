<template>
  <label class="range">
    <input
      ref="input"
      type="range"
      :value="value"
      :name="name"
      :min="min"
      :max="max"
      class="range__input"
      :class="{ ['range__input--error']: isError }"
      :style="{ background: backgroundGradient }"
      @blur="onBlur"
      @change="onChange"
    />
  </label>
</template>

<script>
// todo возможно необходимо расширить валидацией
export default {
  name: "c-range",
  props: {
    property: Object,
    value: Number,
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
    onChange(event) {
      this.$emit("onChange", Number(event.target.value));
    },
  },
  computed: {
    min() {
      return this.property.ui?.min;
    },
    max() {
      return this.property.ui?.max;
    },
    backgroundGradient() {
      const value = ((this.value - this.min) / (this.max - this.min)) * 100;
      const color1 = "var(--main-color)";
      const color2 = "var(--white-color)";
      return `
        linear-gradient(to right, ${color1} 0%, ${color1} ${value}%, ${color2} ${value}%, ${color2} 100%)
      `;
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
