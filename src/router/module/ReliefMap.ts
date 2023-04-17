import { RouteRecordRaw } from "vue-router";

export const reliefMap: Array<RouteRecordRaw> = [
	{
		path: "/reliefMap",
		name: "ReliefMap",
		redirect: "/reliefMap/index",
		component: () => import("@/layout/index.vue"),
		meta: {
			title: "三维地图",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "index",
				name: "ReliefMap1",
				meta: {
					title: "三维地图",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/ReliefMap/index.vue"),
			},
			{
				path: "general",
				name: "ReliefMapGeneral",
				meta: {
					title: "概要",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/ReliefMap/General.vue"),
			},
		],
	},
];
