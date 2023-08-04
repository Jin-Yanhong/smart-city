import Layout from '@/layout/index.vue';
import { RouteRecordRaw } from 'vue-router';

export const System: Array<RouteRecordRaw> = [
	{
		path: '/System',
		name: 'System',
		redirect: '/system/index',
		component: Layout,
		meta: {
			title: 'system.menu.system',
			icon: 'Odometer',
			cache: true,
			show: true,
		},
		children: [
			{
				path: 'index',
				name: 'SystemIndex',
				meta: {
					title: 'system.menu.systemIndex',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/System/index.vue'),
			},
			{
				path: 'dicts',
				name: 'SystemDicts',
				meta: {
					title: 'system.menu.systemDicts',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/System/Dicts.vue'),
			},
		],
	},
];
