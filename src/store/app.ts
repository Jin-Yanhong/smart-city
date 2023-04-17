import { defineStore } from "pinia";
import settings from "@/settings";
import { getStorage, setStorage } from "@/utils";
const sidebarWidth = settings.appConfig.layOut.menuWidth;

import { routeMapKeys } from "@/interface/index";
const useAppStore = defineStore({
	id: "app",
	state: () => ({
		theme: getStorage("theme") || "light",
		currentPath: (getStorage("currentPath") || "system") as keyof routeMapKeys,
		sideBarWidth: sidebarWidth,
	}),
	getters: {
		getTheme: state => {
			return state.theme;
		},
		getCurrentPath: state => {
			return state.currentPath;
		},
		getSideBarWidth: state => {
			return state.sideBarWidth;
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
		switchSideBarWidth: function (state: string) {
			this.sideBarWidth = state as string;
			setStorage("sideBarWidth", this.sideBarWidth);
		},
	},
});

export default useAppStore;
