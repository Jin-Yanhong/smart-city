import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils";

const locale = getStorage("locale");
const isMenuCollapse = getStorage("isMenuCollapse");

const useAppStore = defineStore({
	id: "app",
	state: () => ({
		isMenuCollapse: typeof isMenuCollapse == "boolean" ? isMenuCollapse : false,
		locale: typeof isMenuCollapse == "string" ? locale : window.navigator.language,
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
			setStorage("isMenuCollapse", state);
		},
		setLocale: function (locale: string) {
			this.locale = locale;
			setStorage("locale", locale);
		},
	},
});

export default useAppStore;
