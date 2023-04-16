import { RouteRecordRaw } from "vue-router";

export const spaceModel: Array<RouteRecordRaw> = [
	{
		path: "/SpaceModel",
		name: "SpaceModel",
		redirect: "/SpaceModel/index",
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
				component: () => import("@/views/SpaceModel/index.vue"),
			},
		],
	},
];
