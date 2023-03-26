import { clearStorage, getStorage, setStorage } from "@/utils/index";
import { defineStore } from "pinia";

import { loginFormType } from "@/types";

const useUserStore = defineStore({
	id: "user",
	state: () => ({
		token: getStorage("token"),
	}),
	getters: {
		getToken: state => {
			return state.token;
		},
	},
	actions: {
		async handleLogin(loginArgs: loginFormType) {
			try {
				const accessToken = "abc123";
				setStorage("token", accessToken);
				this.$patch({
					token: accessToken,
				});
			} catch (error: any) {
				this.$patch({
					token: "",
				});
				clearStorage();
			}
		},
		async handleLogout() {
			this.$patch({
				token: "",
			});
			clearStorage();
		},
	},
});

export default useUserStore;
