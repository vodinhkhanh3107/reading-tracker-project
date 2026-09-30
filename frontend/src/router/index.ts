import { createRouter, createWebHistory } from "vue-router";
import DashBoardView from "../views/DashBoardView.vue";
import BookSearchView from "../views/BookSearchView.vue";
import BookDetailView from "../views/BookDetailView.vue";
import MyShelfView from "../views/MyShelfView.vue";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashBoardView,
    },

    {
      path: "/books/search",
      name: "book-search",
      component: BookSearchView,
    },

    {
      path: "/books/:workId",
      name: "book-detail",
      component: BookDetailView,
    },

    {
      path: "/shelf",
      name: "my-shelf",
      component: MyShelfView,
    },
  ],
});