<template>
  <div class="radios">
    <c-radio
      v-for="item in radiosArr"
      :key="item"
      :value="getValue(item)"
      :caption="getCaption(item)"
      :name="name"
      :checked="isChecked(item)"
      :is-error="isError"
      class="radios__item"
      @change="onChange"
      @mounted-ref="onMountedInputRef"
    />
  </div>
</template>

<script>
import CRadio from "@/schema-form/components/property/components/c-radio/c-radio.vue";
import { isObject } from "@/schema-form/helpers/types";

export default {
  name: "radios-arr",
  components: { CRadio },
  props: {
    radiosArr: Array,
    name: String,
    value: [Object, String, Number, Boolean],
    isError: Boolean,
  },
  emits: ["mountedRef", "onChange"],
  data() {
    return {
      inputRefsList: [],
    };
  },
  methods: {
    onMountedInputRef(inputRef) {
      this.inputRefsList.push(inputRef);
      if (this.inputRefsList.length === this.radiosArr.length) {
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
    isChecked(itemValue) {
      return itemValue === this.value;
    },
    onChange(event) {
      this.$emit("onChange", event.target.value);
    },
  },
};
</script>
<style scoped lang="scss" src="./style.scss"></style>
