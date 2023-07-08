<template>
  <h3 v-if="text" class="description">
    {{ text }}
  </h3>
</template>

<script>
export default {
  name: "main-description",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
