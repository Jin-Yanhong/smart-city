import { RouteRecordRaw } from "vue-router";

export const flatMap: Array<RouteRecordRaw> = [
	{
		path: "/flatMap",
		name: "FlatMap",
		redirect: "/flatMap/index",
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
				name: "DataSummary",
				meta: {
					title: "数据概览",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/FlatMap/index.vue"),
			},
			{
				path: "publicOpinion",
				name: "PublicOpinion",
				meta: {
					title: "舆情管理",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/FlatMap/PublicOpinion.vue"),
			},
		],
	},
];
