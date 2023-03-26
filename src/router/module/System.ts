import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

export const system: Array<RouteRecordRaw> = [
	{
		path: "/system",
		name: "System",
		redirect: "/system/index",
		component: Layout,
		meta: {
			title: "系统",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "index",
				name: "SystemIndex",
				meta: {
					title: "总览",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/index.vue"),
			},
			{
				path: "dicts",
				name: "SystemDicts",
				meta: {
					title: "字典",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/Dicts.vue"),
			},
		],
	},
];
