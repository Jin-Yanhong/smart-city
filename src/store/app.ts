import { defineStore } from 'pinia';
import { setI18nLanguage } from '@/i18n';
import { WritableComputedRef } from 'vue';
import { getStorage, setStorage } from '@/utils';

const locale = getStorage('locale');
const isMenuCollapse = getStorage('isMenuCollapse');

const useAppStore = defineStore({
	id: 'app',
	state: () => ({
		isMenuCollapse: typeof isMenuCollapse == 'boolean' ? isMenuCollapse : false,
		locale: (locale ? locale : window.navigator.language) as string | WritableComputedRef<string>,
	}),
	getters: {
		getMenuCollapse: state => {
			return state.isMenuCollapse;
		},
		getLocale: state => {
			return state.locale;
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
	},
});

export default useAppStore;
