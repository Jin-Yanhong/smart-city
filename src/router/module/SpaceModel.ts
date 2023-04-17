import { RouteRecordRaw } from "vue-router";

export const spaceModel: Array<RouteRecordRaw> = [
	{
		path: "/spaceModel",
		name: "SpaceModel",
		redirect: "/spaceModel/index",
		component: () => import("@/layout/index.vue"),
		meta: {
			title: "空间模型",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "index",
				name: "SpaceModel1",
				meta: {
					title: "空间模型",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/SpaceModel/index.vue"),
			},
			{
				path: "general",
				name: "SpaceModelGeneral",
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
