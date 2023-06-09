import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router/index";
import { getStorage, setStorage, setAssetsBaseUrl } from "./utils/index";

import "@/assets/style/reset.less"; // css reset
import "normalize.css";
import "element-plus/dist/index.css"; // ElementPlus style
import "@/assets/style/global.less";

const app = createApp(App);
const i18n = createI18n({});
const pinia = createPinia();

app.config.globalProperties.$getStorage = getStorage;
app.config.globalProperties.$setStorage = setStorage;

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");

window.onload = function () {
	setAssetsBaseUrl();
};
