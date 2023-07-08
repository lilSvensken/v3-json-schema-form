<template>
  <label class="datepicker">
    <input
      ref="input"
      type="date"
      :value="value"
      :name="name"
      :required="required"
      class="datepicker__input valid-field"
      :class="{ ['valid-field--error']: isError }"
      @blur="onBlur"
      @change="onChange"
    />
  </label>
</template>

<script>
// TODO расширить параметры, принимаемые datepicker
export default {
  name: "c-datepicker",
  props: {
    value: String,
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
      this.$emit("onChange", e.target.value);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
