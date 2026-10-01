<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from "vue";

import type {
  ShelfBook,
} from "../../types/shelf-book";

const props = defineProps<{
  open: boolean;
  shelfBook: ShelfBook | null;
  loading?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [currentPage: number];
}>();

const currentPage = ref(0);

watch(
  () => props.shelfBook,
  (value) => {
    if (value) {
      currentPage.value =
        value.currentPage;
    }
  },
  {
    immediate: true,
  },
);


const totalPages = computed(() => {
  return props.shelfBook?.book
    .numberOfPages ?? null;
});

const progress = computed(() => {
  if (
    !totalPages.value ||
    totalPages.value <= 0
  ) {
    return 0;
  }

  return Math.round(
    (currentPage.value /
      totalPages.value) *
      100,
  );
});

const handleSubmit = () => {
  emit(
    "submit",
    currentPage.value,
  );
};
</script>

<template>
  <a-modal
    :open="open"
    title="Update reading progress"
    :confirm-loading="loading"
    ok-text="Save"
    cancel-text="Cancel"
    @ok="handleSubmit"
    @cancel="emit('close')"
  >
    <div
      v-if="shelfBook"
      class="progress-modal"
    >
      <h3>
        {{ shelfBook.book.title }}
      </h3>

      <div class="page-input">
        <span>Current page</span>

        <a-input-number
          v-model:value="currentPage"
          :min="0"
          :max="totalPages ?? undefined"
          style="width: 100%"
        />
      </div>

      <div class="progress-info">
        <span>
          {{ currentPage }}
          /
          {{ totalPages ?? "?" }}
          pages
        </span>

        <span>
          {{ progress }}%
        </span>
      </div>

      <a-progress
        :percent="progress"
      />

      <a-alert
        v-if="currentPage === 0"
        message="Status will be Want to Read"
        type="info"
        show-icon
      />

      <a-alert
        v-else-if="
          totalPages &&
          currentPage === totalPages
        "
        message="Status will be Completed"
        type="success"
        show-icon
      />

      <a-alert
        v-else
        message="Status will be Reading"
        type="info"
        show-icon
      />
    </div>
  </a-modal>
</template>