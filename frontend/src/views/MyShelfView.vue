<script setup lang="ts">
import {
  computed,
  ref,
} from "vue";

import {
  fakeShelfBooks,
} from "../data/fake-books";

import type {
  ReadingStatus,
} from "../types/shelf-book";

const activeStatus =
  ref<"ALL" | ReadingStatus>(
    "ALL",
  );

const shelfBooks =
  fakeShelfBooks;

const filteredBooks =
  computed(() => {

    if (
      activeStatus.value ===
      "ALL"
    ) {
      return shelfBooks;
    }

    return shelfBooks.filter(
      (item) =>
        item.status ===
        activeStatus.value,
    );
  });

const getProgress = (
  current: number,
  total: number | null,
) => {
  if (!total) {
    return 0;
  }

  return Math.min(
    Math.round(
      (current / total) * 100,
    ),
    100,
  );
};

const getStatusLabel = (
  status: ReadingStatus,
) => {
  const labels = {
    WANT_TO_READ: "Want to Read",
    READING: "Reading",
    COMPLETED: "Completed",
  };

  return labels[status];
};

const getStatusColor = (
  status: ReadingStatus,
) => {
  const colors = {
    WANT_TO_READ: "blue",
    READING: "orange",
    COMPLETED: "green",
  };

  return colors[status];
};
</script>

<template>
  <div class="page">

    <div class="page-header">

      <div>

        <a-typography-title
          :level="2"
        >
          My Library
        </a-typography-title>

        <a-typography-paragraph
          type="secondary"
        >
          Track and manage your
          reading journey.
        </a-typography-paragraph>

      </div>

    </div>

    <!-- Statistics -->

    <a-row
      :gutter="[16, 16]"
      class="statistics"
    >

      <a-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card>
          <a-statistic
            title="Total Books"
            :value="shelfBooks.length"
          />
        </a-card>
      </a-col>

      <a-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card>
          <a-statistic
            title="Want to Read"
            :value="
              shelfBooks.filter(
                (b) =>
                  b.status ===
                  'WANT_TO_READ',
              ).length
            "
          />
        </a-card>
      </a-col>

      <a-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card>
          <a-statistic
            title="Reading"
            :value="
              shelfBooks.filter(
                (b) =>
                  b.status ===
                  'READING',
              ).length
            "
          />
        </a-card>
      </a-col>

      <a-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card>
          <a-statistic
            title="Completed"
            :value="
              shelfBooks.filter(
                (b) =>
                  b.status ===
                  'COMPLETED',
              ).length
            "
          />
        </a-card>
      </a-col>

    </a-row>

    <!-- Tabs -->

    <a-card
      :bordered="false"
      class="library-card"
    >

      <a-tabs
        v-model:active-key="
          activeStatus
        "
      >

        <a-tab-pane
          key="ALL"
          tab="All Books"
        />

        <a-tab-pane
          key="WANT_TO_READ"
          tab="Want to Read"
        />

        <a-tab-pane
          key="READING"
          tab="Reading"
        />

        <a-tab-pane
          key="COMPLETED"
          tab="Completed"
        />

      </a-tabs>

      <a-row
        :gutter="[20, 20]"
      >

        <a-col
          v-for="item in filteredBooks"
          :key="item.id"
          :xs="24"
          :sm="12"
          :lg="8"
        >

          <a-card>

            <div class="shelf-book">

              <img
                :src="
                  item.book.coverUrl ||
                  ''
                "
                :alt="item.book.title"
              />

              <div class="shelf-info">

                <a-typography-title
                  :level="5"
                  :ellipsis="{
                    rows: 2,
                  }"
                >
                  {{ item.book.title }}
                </a-typography-title>

                <a-tag
                  :color="
                    getStatusColor(
                      item.status,
                    )
                  "
                >
                  {{
                    getStatusLabel(
                      item.status,
                    )
                  }}
                </a-tag>

                <div
                  v-if="
                    item.status ===
                    'READING'
                  "
                  class="progress"
                >

                  <a-progress
                    :percent="
                      getProgress(
                        item.currentPage,
                        item.book.numberOfPages,
                      )
                    "
                  />

                  <span>
                    {{ item.currentPage }}
                    /
                    {{
                      item.book
                        .numberOfPages
                    }}
                    pages
                  </span>

                </div>

                <div
                  v-if="
                    item.rating
                  "
                  class="rating"
                >
                  <a-rate
                    :value="
                      item.rating
                    "
                    disabled
                  />
                </div>

                <a-button
                  block
                  style="
                    margin-top: 16px;
                  "
                >
                  View Details
                </a-button>

              </div>

            </div>

          </a-card>

        </a-col>

      </a-row>

    </a-card>

  </div>
</template>

<style scoped>
.page {
  max-width: 1400px;
  margin: 0 auto;
}

.statistics {
  margin-bottom: 24px;
}

.library-card {
  margin-top: 24px;
}

.shelf-book {
  display: flex;
  gap: 20px;
}

.shelf-book img {
  width: 130px;
  height: 190px;

  object-fit: cover;

  border-radius: 6px;
}

.shelf-info {
  flex: 1;
}

.progress {
  margin-top: 16px;
}

.progress span {
  color: #777;
  font-size: 13px;
}

.rating {
  margin-top: 12px;
}

@media (max-width: 600px) {
  .shelf-book {
    flex-direction: column;
  }

  .shelf-book img {
    width: 100%;
    height: 280px;
  }
}
</style>