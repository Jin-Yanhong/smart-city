import request from '@/utils/request';
import { requestCallback } from '@/types/index';

const dictCrud = {
	create: (data: any, callback: requestCallback) => {
		return request(
			{
				url: `/data`,
				method: `post`,
				data,
			},
			callback
		);
	},
	read: (id: number | string, callback: requestCallback) => {
		return request(
			{
				url: `/data/{id}`,
				method: `get`,
			},
			callback
		);
	},
	update: (data: any, callback: requestCallback) => {
		return request(
			{
				url: `/data`,
				method: `put`,
				data,
			},
			callback
		);
	},
	delete: (callback: requestCallback) => {
		return request(
			{
				url: `/data/{id}`,
				method: `delete`,
			},
			callback
		);
	},
	list: (callback: requestCallback) => {
		return request(
			{
				url: `/data`,
				method: `get`,
			},
			callback
		);
	},
};

export { dictCrud };
