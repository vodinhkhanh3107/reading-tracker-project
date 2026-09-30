<script setup lang="ts">
import {
  ref,
  computed,
} from "vue";

import {
  SearchOutlined,
} from "@ant-design/icons-vue";

import {
  fakeBooks,
} from "../data/fake-books";

import BookCard from "../components/books/BookCard.vue";

import type { Book } from "../types/book";

const keyword = ref("");

const currentPage = ref(1);

const pageSize = 8;

const showAddModal = ref(false);

const selectedBook = ref<Book | null>(
  null,
);

const filteredBooks = computed(() => {
  const value =
    keyword.value
      .trim()
      .toLowerCase();

  if (!value) {
    return fakeBooks;
  }

  return fakeBooks.filter(
    (book) => {
      const title =
        book.title.toLowerCase();

      const authors =
        book.authors
          .join(" ")
          .toLowerCase();

      return (
        title.includes(value) ||
        authors.includes(value)
      );
    },
  );
});

const paginatedBooks = computed(() => {
  const start =
    (currentPage.value - 1) *
    pageSize;

  return filteredBooks.value.slice(
    start,
    start + pageSize,
  );
});

const handleAdd = (book: Book) => {
  selectedBook.value = book;

  showAddModal.value = true;
};

const handleDetail = (book: Book) => {
  console.log(
    "Open detail:",
    book.workId,
  );
};
</script>

<template>
  <div class="page">

    <div class="page-header">

      <div>
        <a-typography-title
          :level="2"
        >
          Search Books
        </a-typography-title>

        <a-typography-paragraph
          type="secondary"
        >
          Discover books and add them
          to your personal library.
        </a-typography-paragraph>
      </div>

    </div>

    <a-card
      class="search-card"
      :bordered="false"
    >

      <a-input
        v-model:value="keyword"
        size="large"
        placeholder="Search by title or author..."
        allow-clear
      >

        <template #prefix>
          <SearchOutlined />
        </template>

      </a-input>

    </a-card>

    <div class="result-header">

      <a-typography-title
        :level="4"
      >
        Search Results
      </a-typography-title>

      <span>
        {{ filteredBooks.length }} books
      </span>

    </div>

    <a-empty
      v-if="filteredBooks.length === 0"
      description="No books found"
    />

    <a-row
      v-else
      :gutter="[20, 20]"
    >

      <a-col
        v-for="book in paginatedBooks"
        :key="book.workId"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >

        <BookCard
          :book="book"
          @detail="handleDetail"
          @add="handleAdd"
        />

      </a-col>

    </a-row>

    <div class="pagination">

      <a-pagination
        v-model:current="currentPage"
        :page-size="pageSize"
        :total="filteredBooks.length"
        show-less-items
      />

    </div>

    <a-modal
      v-model:open="showAddModal"
      title="Add to Library"
      ok-text="Add Book"
      cancel-text="Cancel"
      centered
    >

      <div
        v-if="selectedBook"
        class="modal-content"
      >

        <img
          :src="selectedBook.coverUrl || ''"
          :alt="selectedBook.title"
        />

        <div>
          <h3>
            {{ selectedBook.title }}
          </h3>

          <p>
            {{ selectedBook.authors.join(", ") }}
          </p>
        </div>

      </div>

      <a-divider />

      <p>
        Choose the initial reading
        status:
      </p>

      <a-radio-group
        default-value="WANT_TO_READ"
      >

        <a-radio value="WANT_TO_READ">
          Want to Read
        </a-radio>

        <a-radio value="READING">
          Reading
        </a-radio>

        <a-radio value="COMPLETED">
          Completed
        </a-radio>

      </a-radio-group>

    </a-modal>

  </div>
</template>

<style scoped>
.page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.search-card {
  margin-bottom: 32px;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-bottom: 20px;
}

.result-header h4 {
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: center;

  margin: 40px 0;
}

.modal-content {
  display: flex;
  gap: 16px;
}

.modal-content img {
  width: 90px;
  height: 130px;
  object-fit: cover;
}

.modal-content h3 {
  margin-top: 0;
}
</style>