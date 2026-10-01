<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  getDashboard,
  type DashboardData,
  type DashboardRecentBook,
} from "../services/dashboard.api";

const dashboard = ref<DashboardData | null>(null);
const loading = ref(false);
const errorMessage = ref("");

const loadDashboard = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    dashboard.value = await getDashboard();
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    errorMessage.value = "Không thể tải dữ liệu Dashboard.";
  } finally {
    setTimeout(() => {
      loading.value = false;
    },2000);
  }
};
onMounted(loadDashboard);

const fakeShelfBooks = computed(() => {
  return (dashboard.value?.recentBooks ?? []).map(
    (item: DashboardRecentBook) => ({
      id: item.id,
      status: item.status,
      currentPage: item.currentPage,
      book: {
        title: item.title,
        coverUrl: item.coverUrl,
        numberOfPages: item.numberOfPages,
      },
    }),
  );
});

// Tổng số sách lấy trực tiếp từ API, không phụ thuộc
// vào số lượng sách trong danh sách recentBooks.
const totalBooks = computed(() => dashboard.value?.totalBooks ?? 0);
</script>

<template>
  <div class="dashboard">
    <a-typography-title :level="2"> Dashboard </a-typography-title>

    <a-typography-paragraph type="secondary">
      Welcome back! Here's your reading overview.
    </a-typography-paragraph>

    <a-alert
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      show-icon
      closable
      style="margin-bottom: 16px"
    />

    <a-button
      :loading="loading"
      @click="loadDashboard"
      style="margin-bottom: 16px"
    >
      Refresh
    </a-button>

    <a-row :gutter="[20, 20]">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="Total Books"
            :value="totalBooks"
            :loading="loading && !dashboard"
          />
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="Want to Read"
            :value="dashboard?.wantToRead ?? 0"
            :loading="loading && !dashboard"
          />
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="Reading"
            :value="dashboard?.reading ?? 0"
            :loading="loading && !dashboard"
          />
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card>
          <a-statistic
            title="Completed"
            :value="dashboard?.completed ?? 0"
            :loading="loading && !dashboard"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-card title="Currently Reading" class="reading-card">
      <a-spin :spinning="loading && !dashboard">
        <a-list
          :data-source="fakeShelfBooks.filter((b) => b.status === 'READING')"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar
                    shape="square"
                    :size="64"
                    :src="item.book.coverUrl ?? undefined"
                  />
                </template>

                <template #title>
                  {{ item.book.title }}
                </template>

                <template #description>
                  <a-progress
                    :percent="
                      item.book.numberOfPages && item.book.numberOfPages > 0
                        ? Math.min(
                            100,
                            Math.round(
                              (item.currentPage / item.book.numberOfPages) *
                                100,
                            ),
                          )
                        : 0
                    "
                  />

                  {{ item.currentPage }}
                  /
                  {{ item.book.numberOfPages ?? "—" }}
                  pages
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

        <a-empty
          v-if="
            !loading &&
            dashboard &&
            !fakeShelfBooks.some((b) => b.status === 'READING')
          "
          description="No books currently reading"
        />
      </a-spin>
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
