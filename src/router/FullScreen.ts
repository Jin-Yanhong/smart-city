import { RouteRecordRaw } from 'vue-router';
import Fullscreen from '@/layout/components/FullScreen.vue';

export const fullScreen: Array<RouteRecordRaw> = [
	{
		path: '/FullScreen',
		name: 'FullScreen',
		redirect: '/FullScreen/flatMap',
		component: Fullscreen,
		meta: {
			title: 'system.menu.fullscreen',
			icon: 'Odometer',
			cache: true,
			show: false,
		},
		children: [
			{
				path: 'flatMap',
				name: 'DataSummary',
				meta: {
					title: 'system.menu.flatMap',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/FullScreen/FlatMap/index.vue'),
			},
			{
				path: 'ReliefMap',
				name: 'ReliefMap',
				meta: {
					title: 'system.menu.reliefMap',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/FullScreen/ReliefMap/index.vue'),
			},
			{
				path: 'SpaceModel',
				name: 'SpaceModel',
				meta: {
					title: 'system.menu.spaceModel',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/FullScreen/SpaceModel/index.vue'),
			},
		],
	},
];
