<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Book } from "../../types/book";


const props = defineProps<{
  book: Book;
}>();

console.log(props.book);

const router = useRouter();

const handleViewDetail = () => {
  router.push({
    name: `book-detail`,
    params: {
      workId: props.book.workId,
    },
  });
  
};

</script>

<template>
  <a-card
    hoverable
    class="book-card"
  >

    <template #cover>

      <div class="cover">

        <img
          v-if="book.coverUrl"
          :src="book.coverUrl"
          :alt="book.title"
        />

        <div
          v-else
          class="no-cover"
        >
          <span>No Cover</span>
        </div>

      </div>

    </template>

    <a-card-meta>

      <template #title>
        <a-tooltip :title="book.title">
          <div class="book-title">
            {{ book.title }}
          </div>
        </a-tooltip>
      </template>

      <template #description>
        <div class="author">
          {{ book.authors.join(", ") }}
        </div>
      </template>

    </a-card-meta>

    <div class="book-meta">

      <a-tag>
        {{ book.firstPublishDate }}
      </a-tag>

      <span v-if="book.numberOfPages">
        {{ book.numberOfPages }} pages
      </span>

    </div>

    <div class="book-actions">

      <a-button
        block
        @click="handleViewDetail"
      >
        View Detail
      </a-button>

      <!-- <a-button
        type="primary"
        block
        @click="emit('add', book)"
      >
        Add to Library
      </a-button> -->

    </div>

  </a-card>
</template>

<style scoped>
.book-card {
  height: 100%;
}

.cover {
  height: 280px;
  background: #f0f2f5;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-cover {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #999;
}

.book-title {
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  min-height: 42px;
}

.book-meta {
  margin-top: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-actions {
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>