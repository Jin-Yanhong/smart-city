import { RouteRecordRaw } from "vue-router";

export const flatMap: Array<RouteRecordRaw> = [
	{
		path: "/flat-map",
		name: "FlatMap",
		redirect: "/flat-map/index",
		component: () => import("@/layout/index.vue"),
		meta: {
			title: "平面地图",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "index",
				name: "FlatMap1",
				meta: {
					title: "平面地图 - 1",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/index.vue"),
			},
			{
				path: "dicts",
				name: "FlatMap2",
				meta: {
					title: "平面地图 - 2",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/Dicts.vue"),
			},
		],
	},
];
