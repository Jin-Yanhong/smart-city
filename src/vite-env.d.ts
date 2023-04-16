/// <reference types="vite/client" />
/// <reference types="element-plus/dist/locale/zh-cn.mjs" />

declare module "*.vue" {
	interface ComponentCustomProperties {
		$getStorage: (key: string) => any;
		$setStorage: (key: string, value: any) => void;
	}

	const component: DefineComponent<{}, {}, any>;
	export default component;
}
