import { defineStore } from "pinia";
import { getStorage, setStorage } from "@/utils";

const isMenuCollapse = getStorage("isMenuCollapse");

const useAppStore = defineStore({
	id: "app",
	state: () => ({
		theme: getStorage("theme") || "light",
		isMenuCollapse: typeof isMenuCollapse == "boolean" ? isMenuCollapse : false,
	}),
	getters: {
		getTheme: state => {
			return state.theme;
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
		switchMenuCollapse: function (state: boolean) {
			this.isMenuCollapse = !this.isMenuCollapse;
			setStorage("isMenuCollapse", this.isMenuCollapse);
		},
	},
});

export default useAppStore;
