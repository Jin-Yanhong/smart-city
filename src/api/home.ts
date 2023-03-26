import request from "@/utils/request";

export function loadImage(callback: Function) {
	return request(
		{
			url: `/api/links/bingWallpaper`,
			method: `get`,
		},
		callback
	);
}
