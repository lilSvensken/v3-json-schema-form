<template>
  <label
    class="file-draggable"
    :class="{
      'file-draggable--dragover': isDragoverEvent,
      'valid-field--error': isError,
    }"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
    @dragover="onDragover"
    @drop="handleDrop"
  >
    <input
      ref="input"
      type="file"
      :name="name"
      :multiple="multiple"
      :required="required"
      class="file-draggable__input"
    />
  </label>
</template>

<script>
export default {
  name: "file-draggable",
  props: {
    name: String,
    multiple: Boolean,
    required: Boolean,
    isError: Boolean,
  },
  emits: ["mountedRef", "addFiles"],
  data() {
    return {
      isDragoverEvent: false,
    };
  },
  mounted() {
    this.$emit("mountedRef", this.$refs["input"]);
  },
  methods: {
    onDragenter(event) {
      event.preventDefault();
      this.isDragoverEvent = true;
    },
    onDragleave(event) {
      event.preventDefault();
      this.isDragoverEvent = false;
    },
    onDragover(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragoverEvent = false;
      const files = event.dataTransfer.files;
      this.$emit("addFiles", files);
      event.target.value = "";
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
