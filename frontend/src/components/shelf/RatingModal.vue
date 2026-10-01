<script setup lang="ts">
import { ref, watch } from "vue";

import type { ShelfBook } from "../../types/shelf-book";

const props = defineProps<{
  open: boolean;
  shelfBook: ShelfBook | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [rating: number | null];
}>();

const rating = ref<number | null>(null);

watch(
  () => props.shelfBook,
  (value) => {
    rating.value = value?.rating ?? null;
  },
  {
    immediate: true,
  },
);

const handleSubmit = () => {
  emit("submit", rating.value);
};

const handleClear = () => {
  rating.value = null;
};
</script>

<template>
  <a-modal
    :open="open"
    title="Rate this book"
    :confirm-loading="loading"
    ok-text="Save"
    cancel-text="Cancel"
    @ok="handleSubmit"
    @cancel="emit('close')"
  >
    <div
      v-if="shelfBook"
      class="rating-modal"
    >
      <h3>
        {{ shelfBook.book.title }}
      </h3>

      <div class="rating-content">
        <span>Your rating</span>

        <a-rate
          v-model:value="rating"
        />
      </div>

      <div class="rating-value">
        <span v-if="rating">
          {{ rating }} / 5
        </span>

        <span v-else>
          Not rated
        </span>
      </div>

      <a-button
        v-if="rating !== null"
        type="link"
        danger
        @click="handleClear"
      >
        Remove rating
      </a-button>
    </div>
  </a-modal>
</template>

<style scoped>
.rating-modal h3 {
  margin-bottom: 24px;
  font-size: 20px;
}

.rating-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rating-value {
  margin-top: 12px;
  color: #777;
}
</style>