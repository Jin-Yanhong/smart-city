import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import { i18n } from '@/i18n/index';
import useAppStore from '@/store/app';
import ElementPlus from 'element-plus';
import { getStorage, setStorage, setAssetsBaseUrl } from './utils/index';

import '@/assets/style/reset.less'; // css reset
import 'normalize.css';
import 'element-plus/dist/index.css'; // ElementPlus style
import '@/assets/style/index.less';

const app = createApp(App);

const pinia = createPinia();

app.config.globalProperties.$setStorage = setStorage;
app.config.globalProperties.$getStorage = getStorage;

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');

window.onload = function () {
	setAssetsBaseUrl();
	useAppStore().setCachedViews();
};
