<script setup lang="ts">
import {
  fakeShelfBooks,
} from "../data/fake-books";
</script>

<template>
  <div class="dashboard">

    <a-typography-title
      :level="2"
    >
      Dashboard
    </a-typography-title>

    <a-typography-paragraph
      type="secondary"
    >
      Welcome back! Here's your
      reading overview.
    </a-typography-paragraph>

    <a-row
      :gutter="[20, 20]"
    >

      <a-col
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <a-card>
          <a-statistic
            title="Total Books"
            :value="
              fakeShelfBooks.length
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
            title="Want to Read"
            :value="
              fakeShelfBooks.filter(
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
              fakeShelfBooks.filter(
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
              fakeShelfBooks.filter(
                (b) =>
                  b.status ===
                  'COMPLETED',
              ).length
            "
          />
        </a-card>
      </a-col>

    </a-row>

    <a-card
      title="Currently Reading"
      class="reading-card"
    >

      <a-list
        :data-source="
          fakeShelfBooks.filter(
            (b) =>
              b.status ===
              'READING',
          )
        "
      >

        <template #renderItem="{ item }">

          <a-list-item>

            <a-list-item-meta>

              <template #avatar>

                <a-avatar
                  shape="square"
                  :size="64"
                  :src="
                    item.book.coverUrl
                  "
                />

              </template>

              <template #title>
                {{ item.book.title }}
              </template>

              <template #description>

                <a-progress
                  :percent="
                    Math.round(
                      (item.currentPage /
                        (item.book.numberOfPages ||
                          1)) *
                        100,
                    )
                  "
                />

                {{ item.currentPage }}
                /
                {{ item.book.numberOfPages }}
                pages

              </template>

            </a-list-item-meta>

          </a-list-item>

        </template>

      </a-list>

    </a-card>

  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

.reading-card {
  margin-top: 24px;
}
</style>