import { RouteRecordRaw } from "vue-router";
import Fullscreen from "@/layout/components/FullScreen.vue";

export const fullScreen: Array<RouteRecordRaw> = [
	{
		path: "/FullScreen",
		name: "FullScreen",
		redirect: "/FullScreen/flatMap",
		component: Fullscreen,
		meta: {
			title: "全屏视图",
			icon: "Odometer",
			cache: true,
			show: true,
		},
		children: [
			{
				path: "flatMap",
				name: "DataSummary",
				meta: {
					title: "平面地图",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/FullScreen/FlatMap.vue"),
			},
			{
				path: "ReliefMap",
				name: "ReliefMap",
				meta: {
					title: "空间地图",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/FullScreen/ReliefMap.vue"),
			},
			{
				path: "SpaceModel",
				name: "SpaceModel",
				meta: {
					title: "空间模型",
					icon: "PieChart",
					cache: true,
					show: true,
				},
				component: () => import("@/views/FullScreen/SpaceModel.vue"),
			},
		],
	},
];
