/// <reference types="vite/client" />
/// <reference types="element-plus/dist/locale/zh-cn.mjs" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";

	interface ComponentCustomProperties {
		$dateFormatter: (time: string | any, pattern?: string) => string;
		$getDate: (dateStr?: string) => { date: string; imageIndex: number };
	}

	const component: DefineComponent<{}, {}, any>;
	export default component;
}
