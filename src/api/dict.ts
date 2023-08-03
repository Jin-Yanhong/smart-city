import request from '@/utils/request';
import { requestCallback, crudQueryParams } from '@/types/index';

const dictCrud = {
	create: (data: any, callback: requestCallback) => {
		request(
			{
				url: `/data`,
				method: `post`,
				data,
			},
			callback
		);
	},
	read: (id: number | string, callback: requestCallback) => {
		request(
			{
				url: `/data/{id}`,
				method: `get`,
			},
			callback
		);
	},
	update: (data: any, callback: requestCallback) => {
		request(
			{
				url: `/data`,
				method: `put`,
				data,
			},
			callback
		);
	},
	delete: (callback: requestCallback) => {
		request(
			{
				url: `/data/{id}`,
				method: `delete`,
			},
			callback
		);
	},
	list: (query: crudQueryParams, callback: requestCallback) => {
		request(
			{
				url: `/api/sys/dict`,
				method: `get`,
				params: query,
			},
			callback
		);
	},
};

export { dictCrud };
