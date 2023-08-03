import { setCookie, getCookie, removeCookie } from '@/utils/auth';
import { clearStorage, envMode } from '@/utils/index';
import { defineStore } from 'pinia';
import { loginFormType } from '@/types';

import { login, logout } from '@/api/user';
import router from '@/router';

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
				if (envMode().isDev) {
					login(loginArgs, res => resolve(res));
				} else {
					resolve({
						token: JSON.stringify(loginArgs),
					});
				}
			})
				.then(res => {
					const token = (res as any).token;
					setCookie(token);
					this.$patch({
						token: token,
					});
				})
				.catch(err => {
					removeCookie();
					this.$patch({
						token: '',
					});
					clearStorage();
					router.replace('/');
				});
		},
		async handleLogout() {
			return new Promise((resolve, reject) => {
				if (envMode().isDev) {
					logout(res => resolve(res));
				} else {
					resolve({});
				}
			}).then(res => {
				removeCookie();
				this.$patch({
					token: '',
				});
				clearStorage();
				router.replace('/');
			});
		},
	},
});

export default useUserStore;
