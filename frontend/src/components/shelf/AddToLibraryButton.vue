<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";

import type { Book } from "../../types/book";
import type { ReadingStatus } from "../../types/shelf-book";
import { addBookToShelf } from "../../services/shelf-book.api";

const props = defineProps<{
  book: Book;
  block?: boolean;
}>();

const emit = defineEmits<{
  success: [];
  error: [error: unknown];
}>();

const addingToShelf = ref(false);

const selectedStatus =
  ref<ReadingStatus>("WANT_TO_READ");

const handleAddToLibrary = async () => {
  try {
    addingToShelf.value = true;

    const response = await addBookToShelf({
      bookId: props.book.id,
      status: selectedStatus.value,
    });

    if (response.success) {
      message.success(response.message);
      emit("success");
    } else {
      message.error(response.message);
      emit("error", response);
    }
  } catch (error) {
    console.error(
      "Add book to library error:",
      error,
    );

    message.error(
      "Failed to add book to library.",
    );

    emit("error", error);
  } finally {
    addingToShelf.value = false;
  }
};
</script>

<template>
  <a-button
    type="primary"
    :block="block"
    :loading="addingToShelf"
    @click="handleAddToLibrary"
  >
    Add to Library
  </a-button>
</template>