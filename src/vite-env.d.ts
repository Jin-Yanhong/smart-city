/// <reference types="@vue/runtime-core" />
import { i18n } from '@/i18n';

const { te, tm, t } = i18n.global;

declare module '*.vue' {
	interface ComponentCustomProperties {
		$getStorage: (key: string) => any;
		$setStorage: (key: string, value: any) => void;
		$te: typeof te;
		$tm: typeof tm;
		$t: typeof t;
	}

	const component: DefineComponent<{}, {}, any>;
	export default component;
}
