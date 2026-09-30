import {
  createRouter,
  createWebHistory,
} from "vue-router";

import DashBoardView
  from "../views/DashBoardView.vue";

import BookSearchView
  from "../views/BookSearchView.vue";

import BookDetailView
  from "../views/BookDetailView.vue";

import MyShelfView
  from "../views/MyShelfView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: DashBoardView,
    },

    {
      path: "/books/search",
      component: BookSearchView,
    },

    {
      path: "/books/:workId",
      component: BookDetailView,
    },

    {
      path: "/shelf",
      component: MyShelfView,
    },
  ],
});

export default router;