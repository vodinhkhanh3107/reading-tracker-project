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
  submit: [note: string | null];
}>();

const note = ref("");

watch(
  () => props.shelfBook,
  (value) => {
    note.value = value?.note ?? "";
  },
  {
    immediate: true,
  },
);

const handleSubmit = () => {
  const value = note.value.trim();

  emit(
    "submit",
    value === "" ? null : value,
  );
};

const handleClear = () => {
  note.value = "";
};
</script>

<template>
  <a-modal
    :open="open"
    title="Book note"
    :confirm-loading="loading"
    ok-text="Save"
    cancel-text="Cancel"
    @ok="handleSubmit"
    @cancel="emit('close')"
  >
    <div
      v-if="shelfBook"
      class="note-modal"
    >
      <h3>
        {{ shelfBook.book.title }}
      </h3>

      <a-textarea
        v-model:value="note"
        :rows="6"
        :maxlength="1000"
        show-count
        placeholder="Write something about this book..."
      />

      <a-button
        v-if="note"
        type="link"
        danger
        @click="handleClear"
      >
        Clear note
      </a-button>
    </div>
  </a-modal>
</template>

<style scoped>
.note-modal h3 {
  margin-bottom: 16px;
  font-size: 20px;
}
</style>