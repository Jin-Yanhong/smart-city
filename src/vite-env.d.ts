/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";

	interface ComponentCustomProperties {
		log(val: any): void;
	}
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
