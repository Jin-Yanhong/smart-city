import { setCookie, getCookie, removeCookie } from '@/utils/auth';
import { clearStorage } from '@/utils/index';
import { defineStore } from 'pinia';
import { loginFormType } from '@/types';

const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		token: getCookie(),
	}),
	getters: {
		getToken: state => {
			return state.token;
		},
	},
	actions: {
		handleLogin(loginArgs: loginFormType) {
			return new Promise((resolve, reject) => {
				const str = JSON.stringify(loginArgs);
				resolve(str);
			})
				.then(res => {
					const accessToken = res as string;
					setCookie(accessToken);
					this.$patch({
						token: accessToken,
					});
				})
				.catch(err => {
					removeCookie();
					this.$patch({
						token: '',
					});
					clearStorage();
				});
		},
		async handleLogout() {
			removeCookie();
			this.$patch({
				token: '',
			});
			clearStorage();
		},
	},
});

export default useUserStore;
