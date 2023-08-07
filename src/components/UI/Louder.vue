<template>
  <div class="louder">
    <div
      v-for="i in 3"
      :style="{ borderColor: color, borderWidth: border + 'px' }"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#181818 transparent transparent transparent',
    },
    border: {
      type: String,
      default: '6',
    },
  },
};
</script>
<style></style>
