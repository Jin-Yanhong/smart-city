import request from '@/utils/request';
import { requestCallback } from '@/types/index';
export function loadData(callback: requestCallback): void {
	return request(
		{
			url: `/first`,
			method: `get`,
		},
		callback
	);
}
