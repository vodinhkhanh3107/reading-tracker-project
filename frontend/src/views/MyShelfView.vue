<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import type { ReadingStatus, ShelfBook } from "../types/shelf-book";
import { getShelfBooks, updateProgress } from "../services/shelf-book.api";
import { message } from "ant-design-vue";
import ShelfBookCard from "../components/shelf/ShelfBookCard.vue";

const shelfBooks = ref<ShelfBook[]>([]);

const loading = ref(false);
const actionLoading = ref(false);

const activeStatus = ref<ReadingStatus | "ALL">("ALL");

const selectedShelfBook = ref<ShelfBook | null>(null);

const progressModalOpen = ref(false);

const ratingModalOpen = ref(false);

const noteModalOpen = ref(false);

const fetchShelfBooks = async () => {
  try {
    loading.value = true;

    const result = await getShelfBooks();
    console.log(result)
    shelfBooks.value = result;
  } catch (error) {
    console.error("Get shelf books error:", error);

    message.error("Failed to load your shelf.");
  } finally {
    loading.value = false;
  }
};

const filteredBooks = computed(() => {
  if (activeStatus.value === "ALL") {
    return shelfBooks.value;
  }

  return shelfBooks.value.filter((item) => item.status === activeStatus.value);
});

const allCount = computed(() => shelfBooks.value.length);

const wantToReadCount = computed(
  () =>
    shelfBooks.value.filter((item) => item.status === "WANT_TO_READ").length,
);

const readingCount = computed(
  () => shelfBooks.value.filter((item) => item.status === "READING").length,
);

const completedCount = computed(
  () => shelfBooks.value.filter((item) => item.status === "COMPLETED").length,
);

const openProgressModal = (shelfBook: ShelfBook) => {
  selectedShelfBook.value = shelfBook;

  progressModalOpen.value = true;
};

const closeProgressModal = () => {
  progressModalOpen.value = false;

  selectedShelfBook.value = null;
};

const handleUpdateProgress = async (currentPage: number) => {
  if (!selectedShelfBook.value) {
    return;
  }

  try {
    actionLoading.value = true;

    const updated = await updateProgress(
      selectedShelfBook.value.id,
      currentPage,
    );

    const index = shelfBooks.value.findIndex((item) => item.id === updated.id);

    if (index !== -1) {
      shelfBooks.value[index] = updated;
    }

    message.success("Reading progress updated.");

    closeProgressModal();
  } catch (error) {
    console.error("Update progress error:", error);

    message.error("Failed to update reading progress.");
  } finally {
    actionLoading.value = false;
  }
};



onMounted(() => fetchShelfBooks());
</script>

<template>
  <div class="my-shelf">
    <div class="my-shelf__header">
      <div>
        <h1>My Library</h1>

        <p>Track your reading journey</p>
      </div>
    </div>

    <div class="status-tabs">
      <a-button
        :type="activeStatus === 'ALL' ? 'primary' : 'default'"
        @click="activeStatus = 'ALL'"
      >
        All ({{ allCount }})
      </a-button>

      <a-button
        :type="activeStatus === 'WANT_TO_READ' ? 'primary' : 'default'"
        @click="activeStatus = 'WANT_TO_READ'"
      >
        Want to Read ({{ wantToReadCount }})
      </a-button>

      <a-button
        :type="activeStatus === 'READING' ? 'primary' : 'default'"
        @click="activeStatus = 'READING'"
      >
        Reading ({{ readingCount }})
      </a-button>

      <a-button
        :type="activeStatus === 'COMPLETED' ? 'primary' : 'default'"
        @click="activeStatus = 'COMPLETED'"
      >
        Completed ({{ completedCount }})
      </a-button>
    </div>

    

    <a-spin :spinning="loading">
      <div v-if="filteredBooks.length" class="shelf-list">
        <ShelfBookCard
          v-for="shelfBook in filteredBooks"
          :key="shelfBook.id"
          :shelf-book="shelfBook"
          @progress="openProgressModal"
          
        />
      </div>

      <a-empty v-else description="Your shelf is empty" />
    </a-spin>

    <UpdateProgressModal
      :open="progressModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="closeProgressModal"
      @submit="handleUpdateProgress"
    />

    <RatingModal
      :open="ratingModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="ratingModalOpen = false"
    />

    <NoteModal
      :open="noteModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="noteModalOpen = false"
    />
  </div>
</template>

<style scoped>
.my-shelf {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.my-shelf__header {
  margin-bottom: 24px;
}

.my-shelf__header h1 {
  margin-bottom: 4px;
  font-size: 32px;
}

.my-shelf__header p {
  margin: 0;
  color: #888;
}

.status-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.shelf-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
