import useUserStore from "@/store/user";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import "nprogress/nprogress.css";
import { system } from "./module/System";
import { flatMap } from "./module/FlatMap";
import { reliefMap } from "./module/ReliefMap";
import { spaceModel } from "./module/SpaceModel";

const whiteList = ["/login"];

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录",
			cache: true,
			show: false,
		},
		component: () => import("@/views/Login/index.vue"),
	},
	{
		path: "/",
		name: "dashboard",
		redirect: "/system/dashboard",
	},
	...system,
	...flatMap,
	...reliefMap,
	...spaceModel,
	{
		path: "/redirect",
		component: () => import("@/views/Redirect/index.vue"),
	},
	{
		path: "/404",
		component: () => import("@/views/ErrorPage/4xx.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/404",
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
	NProgress.start();
	if (useUserStore().getToken) {
		if (to.path === "/login") {
			next({ path: "/" });
			NProgress.done();
		} else {
			try {
				next();
			} catch (err: any) {
				useUserStore().handleLogout();
				ElMessage.error(err.message);
				next("/login");
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
	document.title = `智慧城市 - ${to.meta?.title}`;
});

export default router;
