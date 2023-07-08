<template>
  <file-simple
    v-if="!isDraggable"
    :name="name"
    :required="required"
    :multiple="multiple"
    :is-error="isError"
    @mountedRef="onMountedInputRef"
    @change="onInputChange"
  />

  <file-draggable
    v-else
    :name="name"
    :required="required"
    :multiple="multiple"
    :is-error="isError"
    @mountedRef="onMountedInputRef"
    @change="onInputChange"
    @addFiles="addFiles"
  />

  <files-list
    v-if="currentValue?.length"
    :list="currentValue"
    :required="required"
    @removeItem="removeItem"
  />
</template>

<script>
import { isEmptyValueArray } from "@/schema-form/helpers/isEmptyValueArray";
import FileSimple from "@/schema-form/components/property/components/c-file/components/file-simple/file-simple.vue";
import FilesList from "@/schema-form/components/property/components/c-file/components/files-list/files-list.vue";
import { getStandardFile } from "@/schema-form/components/property/components/c-file/utils/getStandardFile";
import FileDraggable from "@/schema-form/components/property/components/c-file/components/file-draggable/file-draggable.vue";

export default {
  name: "c-file",
  components: { FileDraggable, FilesList, FileSimple },
  props: {
    property: Object,
    value: [String, Array, File],
    name: String,
    required: Boolean,
    isError: Boolean,
  },
  emits: ["mountedRef", "onChange"],
  data() {
    return {
      currentValue: [],
      inputRef: undefined,
    };
  },
  created() {
    this.setCurrentValue();
  },
  methods: {
    onMountedInputRef(inputRef) {
      this.inputRef = inputRef;
      this.$emit("mountedRef", this.inputRef);
    },
    setCurrentValue() {
      if (this.multiple) {
        const isValid = isEmptyValueArray(this.value);
        if (isValid) {
          this.currentValue = this.value;
        }
      } else if (this.value) {
        this.currentValue = [this.value];
      }
    },
    removeItem(index) {
      this.currentValue.splice(index, 1);
      this.currentValue = this.multiple ? this.currentValue : undefined;
      this.$emit("onChange", this.currentValue);
    },
    onInputChange(event) {
      getStandardFile(event.target.files).then((filesStandardList) => {
        this.addFiles(filesStandardList);
      });
    },
    addFiles(files) {
      let newValue;
      if (this.multiple) {
        this.currentValue.push(...files);
        newValue = this.currentValue;
      } else {
        newValue = files[0];
        this.currentValue = [newValue];
      }
      this.$emit("onChange", this.currentValue);
    },
  },
  computed: {
    multiple() {
      return this.property.type === "array";
    },
    isDraggable() {
      return this.property.ui?.draggable;
    },
  },
};
</script>
