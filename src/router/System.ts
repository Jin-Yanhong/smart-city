import Layout from '@/layout/index.vue';
import { RouteRecordRaw } from 'vue-router';
import { Pages } from './module/Pages';

export const System: Array<RouteRecordRaw> = [
	{
		path: '/System',
		name: 'System',
		redirect: '/system/index',
		component: Layout,
		meta: {
			title: '系统管理',
			icon: 'Odometer',
			cache: true,
			show: true,
		},
		children: [
			{
				path: 'general',
				name: 'General',
				meta: {
					title: '概要',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/Pages/General.vue'),
			},
			{
				path: 'index',
				name: 'SystemIndex',
				meta: {
					title: '系统信息',
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
					title: '系统字典',
					icon: 'PieChart',
					cache: true,
					show: true,
				},
				component: () => import('@/views/System/Dicts.vue'),
			},
		],
	},
	...Pages,
];
