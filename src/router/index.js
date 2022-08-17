import { createRouter, createWebHistory } from "vue-router";

const CarList = () => import("../views/CarList.vue");
const CarDetail = () => import("../views/CarDetail.vue");

const routes = [
  {
    name: "carList",
    path: "/",
    components: {
      main: CarList,
    },
  },
  {
    name: "carDetail",
    path: "/carDetail/:id",
    components: {
      main: CarDetail,
    },
  },
];

const paths = createRouter({
  history: createWebHistory(),
  routes,
});

export default { routes, paths };
