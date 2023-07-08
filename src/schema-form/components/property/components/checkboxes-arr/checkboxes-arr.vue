<template>
  <div class="checkboxes">
    <c-checkbox
      v-for="item in checkboxesArr"
      :key="item"
      :value="getValue(item)"
      :caption="getCaption(item)"
      :name="name"
      :checked="isChecked(item)"
      :is-error="isError"
      class="checkboxes__checkbox"
      @change="onChangeCheckbox"
      @mounted-ref="onMountedInputRef"
    />
  </div>
</template>

<script>
import CCheckbox from "@/schema-form/components/property/components/c-checkbox/c-checkbox.vue";
import { isObject } from "@/schema-form/helpers/types";

export default {
  name: "checkboxes-arr",
  components: { CCheckbox },
  props: {
    checkboxesArr: Array,
    name: String,
    value: [Array, String, Number, Boolean],
    isError: Boolean,
  },
  emits: ["mountedRef", "onChange"],
  data() {
    return {
      valueArr: this.value ? this.value : [],
      inputRefsList: [],
    };
  },
  methods: {
    onMountedInputRef(inputRef) {
      this.inputRefsList.push(inputRef);
      if (this.inputRefsList.length === this.checkboxesArr.length) {
        this.$emit("mountedRef", this.inputRefsList);
      }
    },
    getValue(item) {
      if (isObject(item)) {
        return item.value;
      }
      return item;
    },
    getCaption(item) {
      if (isObject(item)) {
        return item.caption;
      }
      return item;
    },
    isChecked(item) {
      const itemValue = item.value ?? item;
      return this.valueArr.includes(itemValue);
    },
    onChangeCheckbox(event) {
      const checkboxValue = event.target.value;
      const isChecked = event.target.checked;
      if (isChecked) {
        this.valueArr.push(checkboxValue);
      } else {
        this.valueArr = this.valueArr.filter((item) => item !== checkboxValue);
      }
      this.$emit("onChange", this.valueArr);
    },
  },
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
