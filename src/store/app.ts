import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils";

import { routeMapKeys } from "@/interface/index";
const useAppStore = defineStore({
	id: "app",
	state: () => ({
		theme: getStorage("theme") || "light",
		currentPath: (getStorage("currentPath") || "system") as keyof routeMapKeys,
	}),
	getters: {
		getTheme: state => {
			return state.theme;
		},
		getCurrentPath: state => {
			return state.currentPath;
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
	},
});

export default useAppStore;
