# babel-plugin-import-to-string

将 import 语句中的路径提取出来。

----

## Example

#### 转换前

```javascript
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
```
#### 配置文件
* babelrc

```javascript
{
  "plugins": [
    [
      "babel-plugin-import-to-string",
      {
        "ignoreImport": ["./otherRouter", "../pages/home/home.vue"]
      }
    ]
  ],
  "presets": []
}


```


#### 转换后

```javascript
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
```
