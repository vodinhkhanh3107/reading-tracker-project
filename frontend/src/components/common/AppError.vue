<template>
  <div class="app-error">
    <a-result
      status="error"
      title="Something went wrong"
      :sub-title="message"
    >
      <template #extra>
        <a-button
          type="primary"
          @click="handleRetry"
        >
          Try again
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Failed to load data.",
  },
);

const emit = defineEmits<{
  retry: [];
}>();

const handleRetry = () => {
  emit("retry");
};
</script>

<style scoped>
.app-error {
  padding: 40px 0;
}
</style>