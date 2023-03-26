import request from "@/utils/request";
import { requestIdleCallback } from "@/types/index";
export function loadImage(callback: requestIdleCallback): void {
	return request(
		{
			url: `/api/links/bingWallpaper`,
			method: `get`,
		},
		callback
	);
}
