import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import router from "./router/index";
import App from "./App.vue";

import "normalize.css"; // css reset
import "element-plus/dist/index.css"; // ElementPlus style

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
