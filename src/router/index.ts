import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import Home from "@/views/Home.vue";

import "nprogress/nprogress.css";

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: Home,
		meta: {
			title: "首页",
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
	NProgress.start();
	next();
});
// router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
//     NProgress.start();
// if (useUserStore().getToken) {
//     if (to.path === '/login') {
//         next({ path: '/' });
//         NProgress.done();
//     } else {
//         try {
//             next();
//         } catch (err: any) {
//             useUserStore().handleLogout();
//             ElMessage.error(err.message || 'Has Error');
//             next('/login');
//             NProgress.done();
//         }
//     }
// } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//         next();
//     } else {
//         next('/login');
//         NProgress.done();
//     }
// }
// });

router.afterEach((to: RouteLocationNormalized) => {
	NProgress.done();
	document.title = `智慧城市 - ${to.meta?.title}`;
});

export default router;
