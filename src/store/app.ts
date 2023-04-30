import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils";

const isMenuCollapse = getStorage("isMenuCollapse");

import { routeMapKeys } from "@/interface/index";
const useAppStore = defineStore({
	id: "app",
	state: () => ({
		theme: getStorage("theme") || "light",
		currentPath: (getStorage("currentPath") || "system") as keyof routeMapKeys,
		isMenuCollapse: typeof isMenuCollapse == "boolean" ? isMenuCollapse : false,
	}),
	getters: {
		getTheme: state => {
			return state.theme;
		},
		getCurrentPath: state => {
			return state.currentPath;
		},
		getMenuCollapse: state => {
			return state.isMenuCollapse;
		},
	},
	actions: {
		switchTheme: function () {
			this.theme = this.theme == "light" ? "dark" : "light";
			setStorage("theme", this.theme);
		},
		changeCurrentPath: function (state: string) {
			this.currentPath = state as keyof routeMapKeys;
			setStorage("currentPath", this.currentPath);
		},
		switchMenuCollapse: function (state: boolean) {
			this.isMenuCollapse = !this.isMenuCollapse;
			setStorage("isMenuCollapse", this.isMenuCollapse);
		},
	},
});

export default useAppStore;
