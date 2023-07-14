const otherRouter = "./otherRouter";
/* -------------------------- 首页 -------------------------- */
const index = "../pages/home/index.vue";
const routes = [{
  path: "*",
  redirect: "/home",
  menu: false
}, {
  path: "/index",
  name: "index",
  component: index,
  text: "首页",
  menu: true
}, ...otherRouter];
export default routes;