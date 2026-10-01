<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import type { ReadingStatus, ShelfBook } from "../types/shelf-book";
import { getShelfBooks, removeFromShelf, updateNote, updateProgress, updateRating } from "../services/shelf-book.api";
import { message, Modal } from "ant-design-vue";
import ShelfBookCard from "../components/shelf/ShelfBookCard.vue";
import UpdateProgressModal from "../components/shelf/UpdateProgressModal.vue";
import RatingModal from "../components/shelf/RatingModal.vue";
import NoteModal from "../components/shelf/NoteModal.vue";

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

const openRatingModal = (
  shelfBook: ShelfBook,
) => {
  selectedShelfBook.value =
    shelfBook;

  ratingModalOpen.value =
    true;
};

const handleUpdateRating = async (
  rating: number | null,
) => {
  if (!selectedShelfBook.value) {
    return;
  }

  try {
    actionLoading.value = true;

    const updated =
      await updateRating(
        selectedShelfBook.value.id,
        rating,
      );

    const index =
      shelfBooks.value.findIndex(
        (item) =>
          item.id ===
          updated.id,
      );

    if (index !== -1) {
      shelfBooks.value[index] =
        updated;
    }

    message.success(
      "Rating updated.",
    );

    ratingModalOpen.value =
      false;

    selectedShelfBook.value =
      null;
  } catch (error) {
    console.error(
      "Update rating error:",
      error,
    );

    message.error(
      "Failed to update rating.",
    );
  } finally {
    actionLoading.value = false;
  }
};

const openNoteModal = (
  shelfBook: ShelfBook,
) => {
  selectedShelfBook.value =
    shelfBook;

  noteModalOpen.value =
    true;
};

const handleUpdateNote = async (
  note: string | null,
) => {
  if (!selectedShelfBook.value) {
    return;
  }

  try {
    actionLoading.value = true;

    const updated =
      await updateNote(
        selectedShelfBook.value.id,
        note,
      );

    const index =
      shelfBooks.value.findIndex(
        (item) =>
          item.id ===
          updated.id,
      );

    if (index !== -1) {
      shelfBooks.value[index] =
        updated;
    }

    message.success(
      "Note updated.",
    );

    noteModalOpen.value =
      false;

    selectedShelfBook.value =
      null;
  } catch (error) {
    console.error(
      "Update note error:",
      error,
    );

    message.error(
      "Failed to update note.",
    );
  } finally {
    actionLoading.value = false;
  }
};

const handleRemoveFromShelf = (shelfBook: ShelfBook) => {
  Modal.confirm({
    title: "Remove book from shelf?",
    content: `Are you sure you want to remove "${shelfBook.book.title}" from your shelf?`,
    okText: "Remove",
    cancelText: "Cancel",
    okType: "danger",

    async onOk() {
      try {
        actionLoading.value = true;

        await removeFromShelf(shelfBook.id);

        shelfBooks.value = shelfBooks.value.filter(
          (item) => item.id !== shelfBook.id,
        );

        message.success(
          "Book removed from your shelf successfully.",
        );
      } catch (error) {
        console.error(
          "Remove book from shelf error:",
          error,
        );

        message.error(
          "Failed to remove book from shelf.",
        );
      } finally {
        actionLoading.value = false;
      }
    },
  });
};



onMounted(() => fetchShelfBooks());
</script>

<template>
  <div class="my-shelf">

    <div class="my-shelf__header">
      <div>
        <h1>My Shelf</h1>

        <p>
          Track your reading journey
        </p>
      </div>
    </div>

    <div class="status-tabs">

      <a-button
        :type="
          activeStatus === 'ALL'
            ? 'primary'
            : 'default'
        "
        @click="
          activeStatus = 'ALL'
        "
      >
        All
        ({{ allCount }})
      </a-button>

      <a-button
        :type="
          activeStatus ===
          'WANT_TO_READ'
            ? 'primary'
            : 'default'
        "
        @click="
          activeStatus =
            'WANT_TO_READ'
        "
      >
        Want to Read
        ({{ wantToReadCount }})
      </a-button>

      <a-button
        :type="
          activeStatus === 'READING'
            ? 'primary'
            : 'default'
        "
        @click="
          activeStatus = 'READING'
        "
      >
        Reading
        ({{ readingCount }})
      </a-button>

      <a-button
        :type="
          activeStatus ===
          'COMPLETED'
            ? 'primary'
            : 'default'
        "
        @click="
          activeStatus =
            'COMPLETED'
        "
      >
        Completed
        ({{ completedCount }})
      </a-button>

    </div>

    <a-spin :spinning="loading">

      <div
        v-if="filteredBooks.length"
        class="shelf-list"
      >

        <ShelfBookCard
          v-for="shelfBook in filteredBooks"
          :key="shelfBook.id"
          :shelf-book="shelfBook"
          @progress="openProgressModal"
          @rating="openRatingModal"
          @note="openNoteModal"
          @remove="handleRemoveFromShelf"
        />

      </div>

      <a-empty
        v-else
        description="Your shelf is empty"
      />

    </a-spin>

    <UpdateProgressModal
      :open="progressModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="
        closeProgressModal
      "
      @submit="
        handleUpdateProgress
      "
    />

    <RatingModal
      :open="ratingModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="
        ratingModalOpen = false
      "
      @submit="
        handleUpdateRating
      "
    />

    <NoteModal
      :open="noteModalOpen"
      :shelf-book="selectedShelfBook"
      :loading="actionLoading"
      @close="
        noteModalOpen = false
      "
      @submit="
        handleUpdateNote
      "
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
