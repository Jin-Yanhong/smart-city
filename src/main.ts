import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router/index";
import { getStorage, setStorage, setAssetsBaseUrl } from "./utils/index";
// import useAppStore from "@/store/app";

import { en } from "@/locale/enUS";
import { ch } from "@/locale/zhCn";

import "@/assets/style/reset.less"; // css reset
import "normalize.css";
import "element-plus/dist/index.css"; // ElementPlus style
import "@/assets/style/global.less";

const app = createApp(App);

const pinia = createPinia();

// const locale = useAppStore().getLocale;

const i18n = createI18n({
	locale: "en",
	messages: {
		en: en,
		zh: ch,
	},
});
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
