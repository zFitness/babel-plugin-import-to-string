import otherRouter from "./otherRouter";
import Cmp from "./Cmp";

/* -------------------------- 首页 -------------------------- */
const index = () => import("../pages/home/index.vue");
const home = () => import("../pages/home/home.vue");

const routes = [
  {
    path: "*",
    redirect: "/home",
    menu: false,
    component: Cmp,
  },
  {
    path: "/index",
    name: "index",
    component: index,
    text: "首页",
    menu: true,
  },
  ...otherRouter
];


export default routes;