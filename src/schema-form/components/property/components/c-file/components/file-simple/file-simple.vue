<template>
  <label
    class="file-simple valid-field"
    :class="{ ['valid-field--error']: isError }"
  >
    <input
      ref="input"
      type="file"
      :name="name"
      :multiple="multiple"
      :required="required"
      class="file-simple__input"
    />
  </label>
</template>

<script>
export default {
  name: "file-simple",
  props: {
    name: String,
    multiple: Boolean,
    required: Boolean,
    isError: Boolean,
  },
  emits: ["mountedRef"],
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
