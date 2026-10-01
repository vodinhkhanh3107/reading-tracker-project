```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import BookCard from "../components/book/BookCard.vue";

import AppLoading from "../components/common/AppLoading.vue";
import AppError from "../components/common/AppError.vue";
import AppEmpty from "../components/common/AppEmpty.vue";

import type { Book } from "../types/book";

import { getBooks, searchBooks } from "../services/book.api.js";
import type { ShelfBook } from "../types/shelf-book.ts";
import { getShelfBooks } from "../services/shelf-book.api.ts";

const keyword = ref("");

const books = ref<Book[]>([]);

const loading = ref(false);

const error = ref<string | null>(null);

const total = ref(0);

const page = ref(1);

const limit = ref(10);

const showAddModal = ref(false);

const selectedBook = ref<Book | null>(null);

const isSearching = ref(false);

const shelfBooks = ref<ShelfBook[]>([]);

const fetchShelfBooks = async () => {
  try {
    shelfBooks.value = await getShelfBooks();
  } catch (error) {
    console.error("Get shelf books error:", error);
  }
};

const fetchAllBooks = async () => {
  try {
    loading.value = true;
    error.value = null;

    const result = await getBooks({
      page: page.value,
      limit: limit.value,
    });

    books.value = result.books;
    total.value = result.total;
  } catch (err) {
    console.error("Get books error:", err);

    error.value = "Unable to load books. Please try again.";
  } finally {
    loading.value = false;
  }
};

const fetchSearchResults = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [result] = await Promise.all([
      searchBooks({
        keyword: keyword.value.trim(),
        page: page.value,
        limit: limit.value,
      }),

      new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      }),
    ]);

    books.value = result.books;
    total.value = result.total;
  } catch (err) {
    console.error("Search books error:", err);

    error.value = "Unable to search books. Please try again.";

    books.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const handleSearch = async () => {
  const searchKeyword = keyword.value.trim();

  if (!searchKeyword) {
    return;
  }

  page.value = 1;

  isSearching.value = true;

  await fetchSearchResults();
};

const handleClearSearch = async () => {
  keyword.value = "";

  isSearching.value = false;

  page.value = 1;

  await fetchAllBooks();
};

const handlePageChange = async (newPage: number) => {
  page.value = newPage;

  if (isSearching.value) {
    await fetchSearchResults();
  } else {
    await fetchAllBooks();
  }
};

const shelfBookIds = computed(() => {
  return new Set(shelfBooks.value.map((shelfBook) => shelfBook.book.id));
});

const isBookAddedToShelf = (bookId: number) => {
  return shelfBookIds.value.has(bookId);
};

const handleBookAdded = () => {
  fetchShelfBooks();
};

onMounted(() => {
  fetchShelfBooks();
  fetchAllBooks();
});
</script>

<template>
  <div class="page">
    <!-- Header -->
    <div class="page-header">
      <div>
        <a-typography-title :level="2">
          {{ isSearching ? "Search Results" : "All Books" }}
        </a-typography-title>

        <a-typography-paragraph type="secondary">
          Discover books and add them to your personal library.
        </a-typography-paragraph>
      </div>
    </div>

    <!-- Search -->
    <a-card class="search-card" :bordered="false">
      <div class="search-container">
        <a-input
          v-model:value="keyword"
          placeholder="Search books..."
          size="large"
          :disabled="loading"
          @press-enter="handleSearch"
        />
        <a-button
          type="primary"
          size="large"
          :loading="loading"
          @click="handleSearch"
        >
          Search
        </a-button>
        <a-button
          size="large"
          :disabled="loading || !keyword"
          @click="handleClearSearch"
        >
          Clear
        </a-button>
      </div>
    </a-card>

    <AppLoading v-if="loading" message="Searching books..." />

    <AppError
      v-else-if="error"
      :message="error"
      @retry="isSearching ? fetchSearchResults() : fetchAllBooks()"
    />

    <template v-else>
      <!-- Result Header -->
      <div class="result-header">
        <a-typography-title :level="4">
          {{ isSearching ? "Search Results" : "All Books" }}
        </a-typography-title>

        <span> {{ total }} books </span>
      </div>

      <!-- Empty -->
      <AppEmpty
        v-if="books.length === 0"
        :message="isSearching ? 'No books found.' : 'No books available.'"
      />

      <!-- Books -->
      <template v-else>
        <a-row :gutter="[20, 20]">
          <a-col
            v-for="book in books"
            :key="book.workId"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <BookCard
              :book="book"
              :is-added-to-shelf="isBookAddedToShelf(book.id)"
              @added="handleBookAdded"
            />
          </a-col>
        </a-row>

        <!-- Pagination -->
        <div class="pagination">
          <a-pagination
            v-model:current="page"
            :page-size="limit"
            :total="total"
            @change="handlePageChange"
          />
        </div>
      </template>
    </template>

    <a-modal
      v-model:open="showAddModal"
      title="Add to Library"
      ok-text="Add Book"
      cancel-text="Cancel"
      centered
    >
      <div v-if="selectedBook" class="modal-content">
        <img :src="selectedBook.coverUrl || ''" :alt="selectedBook.title" />

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

      <p>Choose the initial reading status:</p>

      <a-radio-group default-value="WANT_TO_READ">
        <a-radio value="WANT_TO_READ"> Want to Read </a-radio>

        <a-radio value="READING"> Reading </a-radio>

        <a-radio value="COMPLETED"> Completed </a-radio>
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

.search-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-container .ant-input {
  flex: 1;
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
```
