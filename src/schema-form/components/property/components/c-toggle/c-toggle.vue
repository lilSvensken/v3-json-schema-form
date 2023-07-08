<template>
  <label class="toggle">
    <input
      ref="input"
      type="checkbox"
      class="toggle__input"
      :class="{ ['toggle__input--error']: isError }"
      :name="name"
      :required="required"
      :checked="value"
      @change="onChange"
    />
  </label>
</template>

<script>
export default {
  name: "c-toggle",
  props: {
    value: Boolean,
    name: String,
    required: Boolean,
    isError: Boolean,
  },
  emit: ["mountedRef", "onChange"],
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
  methods: {
    onChange() {
      this.$emit("onChange", !this.value);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
