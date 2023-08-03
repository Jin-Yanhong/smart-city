import NProgress from 'nprogress';
import useUserStore from '@/store/user';
import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { i18n } from '@/i18n';
import 'nprogress/nprogress.css';

import { fullScreen } from './FullScreen';
import { System } from './System';
import { Pages } from './module/Pages';
import settings from '@/settings';

const whiteList = ['/login'];

const { tm } = i18n.global;

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: 'system.menu.login',
			cache: true,
			show: false,
		},
		component: () => import('@/views/Login/index.vue'),
	},
	{
		path: '/',
		name: 'HomePage',
		redirect: settings.homePage,
		meta: {
			title: 'system.menu.home',
			cache: false,
			show: false,
		},
	},

	...Pages,
	...System,
	...fullScreen,

	{
		path: '/redirect',
		component: () => import('@/views/Redirect/index.vue'),
		meta: {
			title: undefined,
			cache: false,
			show: false,
		},
	},
	{
		path: '/404',
		component: () => import('@/views/ErrorPage/4xx.vue'),
		meta: {
			title: 'system.menu.notFound',
			cache: false,
			show: false,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		meta: {
			title: undefined,
			cache: false,
			show: false,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
	NProgress.start();
	if (useUserStore().getToken) {
		if (to.path === '/login') {
			next({ path: '/' });
			NProgress.done();
		} else {
			try {
				next();
			} catch (err: any) {
				useUserStore().handleLogout();
				ElMessage.error(err.message);
				next('/login');
				NProgress.done();
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next();
		} else {
			next(`/login?redirect=${to.path}`);
			NProgress.done();
		}
	}
});

router.afterEach((to: RouteLocationNormalized) => {
	NProgress.done();
	try {
		document.title = `${tm('system.appName')} - ${tm(to?.meta?.title as string)}`;
	} catch (error: any) {
		console.log('[vueI18n]', error.message);
	}
});

export default router;
