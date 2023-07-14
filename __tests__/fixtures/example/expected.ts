import otherRouter from "./otherRouter";
const Cmp = "./Cmp";
/* -------------------------- 首页 -------------------------- */
const index = "../pages/home/index.vue";
const home = () => import("../pages/home/home.vue");
const routes = [{
  path: "*",
  redirect: "/home",
  menu: false,
  component: Cmp
}, {
  path: "/index",
  name: "index",
  component: index,
  text: "首页",
  menu: true
}, ...otherRouter];
export default routes;