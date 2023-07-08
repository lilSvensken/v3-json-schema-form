<template>
  <div class="list">
    <div v-for="(file, index) in list" :key="index" class="list__name-wrapper">
      <div class="list__name">
        {{ file.name }}
      </div>

      <button type="button" class="list__btn-remove" @click="removeItem(index)">
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "files-list",
  props: {
    list: Array,
    required: Boolean,
  },
  emits: ["removeItem"],
  methods: {
    removeItem(index) {
      this.$emit("removeItem", index);
    },
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
