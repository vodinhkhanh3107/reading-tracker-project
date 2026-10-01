<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { Book } from "../types/book";
import { onMounted, ref } from "vue";
import { getBookDetail } from "../services/book.api";
import AppLoading from "../components/common/AppLoading.vue";
import AddToLibraryButton from "../components/shelf/AddToLibraryButton.vue";

const route = useRoute();

const router = useRouter();

const book = ref<Book | null>(null);
console.log("book", book);

const loading = ref(false);

const error = ref<string | null>(null);

const fetchBookDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    const workId = route.params.workId;
    if (typeof workId !== "string" || !workId.trim()) {
      error.value = "Invalid book ID.";
      return;
    }
    book.value = await getBookDetail(workId);
  } catch (err) {
    console.error("Get book detail error:", err);
    error.value = "Unable to load book details.";
  } finally {
    loading.value = false;
  }
};
const handleBack = () => {
  router.back();
};
onMounted(() => {
  fetchBookDetail();
});
</script>

<template>
  <div class="book-detail-page">
    <!-- Back -->
    <div class="back-button">
      <a-button type="text" @click="handleBack">
        <ArrowLeftOutlined /> Back
      </a-button>
    </div>
    <!-- Loading -->
    <AppLoading v-if="loading" message="Loading book details..." />
    <!-- Error -->
    <AppError v-else-if="error" :message="error" @retry="fetchBookDetail" />
    <!-- Book Detail -->
    <template v-else-if="book">
      <a-card class="book-detail-card" :bordered="false">
        <a-row :gutter="[40, 40]">
          <!-- Cover -->
          <a-col :xs="24" :sm="8" :md="7" :lg="6">
            <div class="cover-container">
              <img
                v-if="book.coverUrl"
                :src="book.coverUrl"
                :alt="book.title"
                class="book-cover"
              />
              <div v-else class="no-cover">No Cover</div>
            </div>
          </a-col>
          <!-- Information -->
          <a-col :xs="24" :sm="16" :md="17" :lg="18">
            <div class="book-info">
              <a-typography-title :level="1">
                {{ book.title }}
              </a-typography-title>
              <!-- Authors -->
              <div class="book-field">
                <strong> Authors: </strong>
                <span> {{ book.authors?.join(", ") || "Unknown" }} </span>
              </div>
              <!-- Publish Date -->
              <div v-if="book.firstPublishDate" class="book-field">
                <strong> First published: </strong>
                <span> {{ book.firstPublishDate }} </span>
              </div>
              <!-- Pages -->
              <div v-if="book.numberOfPages" class="book-field">
                <strong> Pages: </strong>
                <span> {{ book.numberOfPages }} </span>
              </div>
              <!-- Subjects -->
              <div v-if="book.subjects?.length" class="book-field">
                <strong> Subjects: </strong>
                <div class="subjects">
                  <a-tag v-for="subject in book.subjects" :key="subject">
                    {{ subject }}
                  </a-tag>
                </div>
              </div>
              <a-divider />
              <!-- Description -->
              <div v-if="book.description" class="description">
                <a-typography-title :level="4">
                  Description
                </a-typography-title>
                <a-typography-paragraph>
                  {{ book.description }}
                </a-typography-paragraph>
              </div>
              <!-- Action -->
              <AddToLibraryButton
                :book="book"
                block
              />
              
            </div>
          </a-col>
        </a-row>
      </a-card>
    </template>
  </div>
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

  grid-template-columns: 300px 1fr;

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
