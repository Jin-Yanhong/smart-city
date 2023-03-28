import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

export const spaceModel: Array<RouteRecordRaw> = [
	{
		path: "/space-model",
		name: "SpaceModel",
		redirect: "/space-model/index",
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
					title: "空间模型 - 1",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/index.vue"),
			},
			{
				path: "dicts",
				name: "SpaceModel2",
				meta: {
					title: "空间模型 - 2",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/System/Dicts.vue"),
			},
		],
	},
];
