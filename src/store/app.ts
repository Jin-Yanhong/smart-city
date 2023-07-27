import { routes } from '@/router';
import { defineStore } from 'pinia';
import { setI18nLanguage } from '@/i18n';
import { WritableComputedRef } from 'vue';
import { getStorage, setStorage } from '@/utils';
import { RouteRecordRaw, RouteRecordName } from 'vue-router';

function flapComponent(routes: Array<RouteRecordRaw>, result: Array<RouteRecordRaw> = []) {
	for (let i = 0; i < routes.length; i++) {
		const component = routes[i];
		if (component.children) {
			for (let k = 0; k < component.children.length; k++) {
				const el = component.children[k];
				el.path = component.path + '/' + el.path;
			}
			flapComponent(component.children, result);
		}
		result.push(component);
	}
	return result;
}

const locale = getStorage('locale');
const isMenuCollapse = getStorage('isMenuCollapse');
const cachedViews = getStorage('cachedViews') as Array<RouteRecordName>;

const useAppStore = defineStore({
	id: 'app',
	state: () => ({
		isMenuCollapse: typeof isMenuCollapse == 'boolean' ? isMenuCollapse : false,
		locale: (locale ? locale : window.navigator.language) as string | WritableComputedRef<string>,
		cachedViews: cachedViews instanceof Array ? cachedViews : [],
	}),
	getters: {
		getMenuCollapse: state => {
			return state.isMenuCollapse;
		},
		getLocale: state => {
			return state.locale;
		},
		getCachedViews(state) {
			return state.cachedViews;
		},
	},
	actions: {
		switchMenuCollapse: function (state: boolean) {
			this.isMenuCollapse = state;
			setStorage('isMenuCollapse', state);
		},
		setLocale: function (locale: string | WritableComputedRef<string>) {
			this.locale = locale as string;
			setI18nLanguage(locale);
			setStorage('locale', locale);
		},
		setCachedViews() {
			const cachedViews: Array<RouteRecordName> = [];
			flapComponent(routes).map(el => {
				if (el?.meta?.cache) {
					cachedViews.push(el.name as RouteRecordName);
				}
			});
			setStorage('cachedViews', cachedViews);
			this.cachedViews = cachedViews;
		},
	},
});

export default useAppStore;
