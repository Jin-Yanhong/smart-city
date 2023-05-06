export function cesiumBaseUrl() {
	// Cesium 静态资源路径
	(window as Window & any).CESIUM_BASE_URL = import.meta.env.MODE == "development" ? "/cesium" : "/smart-city/cesium";
}

export function getStorage(key: string): string {
	const str: string = window.localStorage[key] ?? undefined;
	try {
		if (str) {
			const storageString = window.localStorage.getItem(key) as string;
			return JSON.parse(storageString)[key];
		} else {
			return "";
		}
	} catch (error: any) {
		return "";
	}
}

export function setStorage(key: string, value: any): void {
	const str = JSON.stringify({
		[key]: value,
	});
	window.localStorage.setItem(key, str);
}

export function clearStorage(): void {
	window.localStorage.clear();
}
