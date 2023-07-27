import cookie from 'js-cookie';

export function getCookie(): string {
	return cookie.get('token') ?? '';
}

export function setCookie(token: string) {
	try {
		cookie.set('token', token, {
			expires: 1,
			sameSite: 'strict',
			secure: true,
		});
		return true;
	} catch (error) {
		console.log('setCookie Error:', error);
		return false;
	}
}

export function removeCookie(): boolean {
	try {
		cookie.remove('token');
		return true;
	} catch (error) {
		return false;
	}
}
