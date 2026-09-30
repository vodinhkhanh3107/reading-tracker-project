<template>
  <div class="app-loading">
    <a-spin size="large" />

    <p v-if="message" class="loading-message">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Loading...",
  },
);
</script>

<style scoped>
.app-loading {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-message {
  margin-top: 16px;
  color: #666;
  font-size: 14px;
}
</style>