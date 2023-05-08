import { RouteRecordRaw } from "vue-router";

export const Pages: Array<RouteRecordRaw> = [
	{
		path: "/Pages",
		name: "Pages",
		component: () => import("@/layout/index.vue"),
		meta: {
			title: "业务视图",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "general",
				name: "General",
				meta: {
					title: "概要",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/Pages/General.vue"),
			},
			{
				path: "dashboard",
				name: "Dashboard",
				meta: {
					title: "图表",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/Pages/Dashboard.vue"),
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
				component: () => import("@/views/Pages/PublicOpinion.vue"),
			},
		],
	},
];
