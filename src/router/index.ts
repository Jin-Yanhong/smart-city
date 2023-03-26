import Layout from "@/layout/index.vue";
import useUserStore from "@/store/user";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import "nprogress/nprogress.css";

const whiteList = ["/login"];

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login/index.vue"),
		meta: {
			title: "登录",
			cache: true,
			show: false,
		},
	},
	{
		path: "/",
		redirect: "/dashboard",
		name: "root",
		component: Layout,
		meta: {
			title: "系统概要",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "dashboard",
				name: "dashboard",
				meta: {
					title: "总览",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/Dashboard/index.vue"),
			},
		],
	},

	{
		path: "/home",
		name: "View",
		component: Layout,
		meta: {
			title: "首页",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "",
				name: "Home",
				meta: {
					title: "总览",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/Home/index.vue"),
			},
		],
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
				ElMessage.error(err.message || "Has Error");
				next("/login");
				NProgress.done();
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next();
		} else {
			next("/login");
			NProgress.done();
		}
	}
});

router.afterEach((to: RouteLocationNormalized) => {
	NProgress.done();
	document.title = `智慧城市 - ${to.meta?.title}`;
});

export default router;
