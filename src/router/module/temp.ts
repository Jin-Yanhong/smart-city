import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

export const temp: Array<RouteRecordRaw> = [
	{
		path: "/temp",
		name: "temp",
		redirect: "/temp/index",
		component: Layout,
		meta: {
			title: "临时",
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
				component: () => import("@/views/temp.vue"),
			},
		],
	},
];
