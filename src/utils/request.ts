import axios, { type AxiosRequestHeaders, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { requestCode } from './constant';
import { getCookie, removeCookie } from '@/utils/auth';
import { responseData, requestCallback } from '@/types/index';
import router from '@/router';

const service = axios.create({
	baseURL: import.meta.env.MODE == 'development' ? '/' : import.meta.env.VITE_BASE_API,
	timeout: 5000,
	withCredentials: false, // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
	config => {
		const token = getCookie();
		const customerHeaders: Partial<AxiosRequestHeaders> = {
			'Content-Type': 'application/json;charset=utf-8',
		};
		if (token) {
			customerHeaders.token = token;
		}
		config.headers = Object.assign(config.headers, customerHeaders);
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// Response interceptors
service.interceptors.response.use(
	response => {
		const res = response.data;
		const code = res.code;

		if (code === requestCode.userNotAuthorized) {
			removeCookie();

			ElMessageBox.confirm('登陆已过期，可以取消继续留在该页面，或者重新登录', '确定退出', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					router.push('/login');
				})
				.catch(err => {
					router.push('/login');
				});
			return Promise.reject(res.msg);
		}

		if (code !== requestCode.success) {
			ElMessage({
				message: res.msg,
				type: 'error',
				duration: 5 * 1000,
			});
			return Promise.reject(new Error(res.msg));
		} else {
			return res;
		}
	},
	error => {
		return Promise.reject(error);
	}
);

/**
 *
 */
function request(requestData: AxiosRequestConfig, successCallback: requestCallback, errorCallback?: requestCallback) {
	service({ ...requestData })
		.then((res: AxiosResponse<any, any>) => {
			const data: responseData = res.data;
			successCallback(data);
		})
		.catch((err: responseData) => {
			if (errorCallback) {
				errorCallback(err);
			} else {
				ElNotification({
					title: '系统提示',
					message: err.message,
					type: 'error',
				});
			}
		});
}
export default request;
