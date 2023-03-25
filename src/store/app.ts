import { defineStore } from "pinia";

const useAppStore = defineStore({
	id: "app",
	state: () => ({
		theme: "light",
	}),
	getters: {
		getTheme: state => {
			return state.theme;
		},
	},
	actions: {
		switchTheme: function () {
			this.theme = this.theme == "light" ? "dark" : "light";
		},
	},
});

export default useAppStore;
