import { RouteRecordRaw } from "vue-router";

export const reliefMap: Array<RouteRecordRaw> = [
	{
		path: "/relief",
		name: "ReliefMap",
		redirect: "/relief/index",
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
					title: "三维地图 - 1",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/index.vue"),
			},
			{
				path: "dicts",
				name: "ReliefMap2",
				meta: {
					title: "三维地图 - 2",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/Dicts.vue"),
			},
		],
	},
];
