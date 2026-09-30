<script setup lang="ts">
import {
  BookOutlined,
  SearchOutlined,
  ReadOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

import { RouterLink } from "vue-router";
</script>

<template>
  <a-layout class="app-layout">

    <a-layout-sider
      :width="240"
      theme="light"
      class="sidebar"
    >
      <div class="logo">
        <BookOutlined />
        <span>Reading Tracker</span>
      </div>

      <a-menu
        mode="inline"
        theme="light"
      >
        <a-menu-item key="dashboard">
          <template #icon>
            <HomeOutlined />
          </template>

          <RouterLink to="/">
            Dashboard
          </RouterLink>
        </a-menu-item>

        <a-menu-item key="search">
          <template #icon>
            <SearchOutlined />
          </template>

          <RouterLink to="/books/search">
            Search Books
          </RouterLink>
        </a-menu-item>

        <a-menu-item key="shelf">
          <template #icon>
            <ReadOutlined />
          </template>

          <RouterLink to="/shelf">
            My Library
          </RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>

      <a-layout-header class="header">
        <div>
          <strong>My Reading Space</strong>
        </div>

        <div class="header-user">
          <a-avatar>
            K
          </a-avatar>

          <span>Reader</span>
        </div>
      </a-layout-header>

      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.sidebar {
  border-right: 1px solid #eee;
}

.logo {
  height: 64px;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 24px;

  font-size: 17px;
  font-weight: 700;
}

.header {
  height: 64px;

  background: #fff;

  padding: 0 28px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #eee;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.content {
  padding: 32px;

  background: #f7f8fa;

  min-height: calc(100vh - 64px);
}
</style>