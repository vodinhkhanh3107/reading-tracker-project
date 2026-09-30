<template>
  <div class="app-empty">
    <a-empty
      :description="message"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "No data found.",
  },
);
</script>

<style scoped>
.app-empty {
  padding: 60px 0;
}
</style>