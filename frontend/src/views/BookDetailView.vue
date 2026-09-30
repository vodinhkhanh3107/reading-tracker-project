<script setup lang="ts">
import {
  computed,
} from "vue";

import {
  useRoute,
  useRouter,
} from "vue-router";

import {
  fakeBooks,
} from "../data/fake-books";

const route = useRoute();

const router = useRouter();

const book = computed(() => {
  return fakeBooks.find(
    (item) =>
      item.workId ===
      route.params.workId,
  );
});
console.log("book", book);
</script>

<template>
  <div
    v-if="book"
    class="detail-page"
  >

    <a-button
      type="text"
      @click="router.back()"
    >
      ← Back
    </a-button>

    <a-card
      class="detail-card"
      :bordered="false"
    >

      <div class="detail-layout">

        <div class="detail-cover">

          <img
            :src="book.coverUrl || ''"
            :alt="book.title"
          />

        </div>

        <div class="detail-info">

          <a-typography-title
            :level="1"
          >
            {{ book.title }}
          </a-typography-title>

          <a-typography-paragraph
            type="secondary"
          >
            By
            <strong>
              {{ book.authors.join(", ") }}
            </strong>
          </a-typography-paragraph>

          <div class="tags">

            <a-tag>
              {{ book.firstPublishDate }}
            </a-tag>

            <a-tag>
              {{ book.numberOfPages }}
              pages
            </a-tag>

          </div>

          <a-divider />

          <a-typography-title
            :level="4"
          >
            Description
          </a-typography-title>

          <a-typography-paragraph>
            {{ book.description }}
          </a-typography-paragraph>

          <a-typography-title
            :level="4"
          >
            Subjects
          </a-typography-title>

          <a-space wrap>

            <a-tag
              v-for="subject in book.subjects"
              :key="subject"
            >
              {{ subject }}
            </a-tag>

          </a-space>

          <div class="detail-actions">

            <a-button
              type="primary"
              size="large"
            >
              Add to Library
            </a-button>

          </div>

        </div>

      </div>

    </a-card>

  </div>

  <a-result
    v-else
    status="404"
    title="Book not found"
  />

</template>

<style scoped>
.detail-page {
  max-width: 1100px;
  margin: 0 auto;
}

.detail-card {
  margin-top: 16px;
}

.detail-layout {
  display: grid;

  grid-template-columns:
    300px 1fr;

  gap: 48px;
}

.detail-cover img {
  width: 100%;
  border-radius: 8px;
}

.tags {
  display: flex;
  gap: 8px;
}

.detail-actions {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-cover {
    max-width: 280px;
  }
}
</style>