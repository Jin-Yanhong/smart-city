import request from '@/utils/request';
import { loginFormType, requestCallback } from '@/types/index';

export function login(data: loginFormType, callback: requestCallback): void {
	return request(
		{
			url: `/api/auth/login`,
			method: 'post',
			data,
		},
		callback
	);
}

export function logout(callback: requestCallback): void {
	return request(
		{
			url: `/api/auth/logout`,
			method: 'post',
		},
		callback
	);
}
