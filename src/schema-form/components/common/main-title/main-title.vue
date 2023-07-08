<template>
  <h2 v-if="text" class="title">
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: "main-title",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
