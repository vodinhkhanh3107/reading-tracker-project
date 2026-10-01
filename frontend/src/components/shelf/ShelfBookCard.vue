<script setup lang="ts">
import { computed } from "vue";
import type { ShelfBook } from "../../types/shelf-book";

interface Props {
  shelfBook: ShelfBook;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  progress: [ShelfBook];
  rating: [ShelfBook];
  note: [ShelfBook];
  remove: [ShelfBook];
}>();

const progress = computed(() => {
  const totalPages = props.shelfBook.book.numberOfPages;

  if (!totalPages || totalPages <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((props.shelfBook.currentPage / totalPages) * 100),
  );
});

const statusLabel = computed(() => {
  switch (props.shelfBook.status) {
    case "WANT_TO_READ":
      return "Want to Read";

    case "READING":
      return "Reading";

    case "COMPLETED":
      return "Completed";

    default:
      return "";
  }
});
</script>

<template>
  <a-card class="shelf-book-card">
    <div class="shelf-book-card__content">
      <div class="shelf-book-card__cover">
        <img
          :src="shelfBook.book.coverUrl || '/placeholder-book.png'"
          :alt="shelfBook.book.title"
        />
      </div>

      <div class="shelf-book-card__info">
        <h3>
          {{ shelfBook.book.title }}
        </h3>

        <p class="author">
          {{ shelfBook.book.authors?.join(", ") }}
        </p>

        <a-tag>
          {{ statusLabel }}
        </a-tag>

        <div class="progress-section">
          <div class="progress-header">
            <span>
              {{ shelfBook.currentPage }}
              /
              {{ shelfBook.book.numberOfPages ?? "?" }}
              pages
            </span>

            <span> {{ progress }}% </span>
          </div>

          <a-progress :percent="progress" :show-info="false" />
        </div>

        <div class="rating-section">
          <span>Rating:</span>

          <a-rate :value="shelfBook.rating ?? 0" disabled />
        </div>

        <div v-if="shelfBook.note" class="note">
          <strong>Note:</strong>
          {{ shelfBook.note }}
        </div>

        <div class="actions">
          <a-button @click="emit('progress', shelfBook)">
            Update progress
          </a-button>

          <a-button @click="emit('rating', shelfBook)"> Rating </a-button>

          <a-button @click="emit('note', shelfBook)"> Note </a-button>

          <a-button danger @click="emit('remove', shelfBook)">
            Remove from Shelf
          </a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>
<style>
.shelf-book-card__content {
  display: flex;
  gap: 24px;
}

.shelf-book-card__cover {
  width: 140px;
  min-width: 140px;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
}

.shelf-book-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shelf-book-card__info {
  flex: 1;
}

.shelf-book-card__info h3 {
  margin: 0 0 6px;
  font-size: 20px;
}

.author {
  margin-bottom: 12px;
  color: #777;
}

.progress-section {
  margin-top: 20px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.note {
  margin-top: 12px;
  padding: 10px 12px;
  background: #fafafa;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}
</style>
