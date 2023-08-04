import request from '@/utils/request';
import { requestCallback, crudQueryParams } from '@/types/index';

const dictCrud = {
	create: (data: any, callback: requestCallback) => {
		request(
			{
				url: `/api/dict`,
				method: `post`,
				data,
			},
			callback
		);
	},
	read: (id: number | string, callback: requestCallback) => {
		request(
			{
				url: `/api/dict/{id}`,
				method: `get`,
			},
			callback
		);
	},
	update: (data: any, callback: requestCallback) => {
		request(
			{
				url: `/api/dict`,
				method: `put`,
				data,
			},
			callback
		);
	},
	delete: (id: number, callback: requestCallback) => {
		request(
			{
				url: `/api/dict/${id}`,
				method: `delete`,
			},
			callback
		);
	},
	list: (query: crudQueryParams, callback: requestCallback) => {
		request(
			{
				url: `/api/dict`,
				method: `get`,
				params: query,
			},
			callback
		);
	},
};

export { dictCrud };
