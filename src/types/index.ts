export type loginFormType = {
	userName: string;
	passWord: string;
};

export type responseData = {
	code: number;
	data: Array<any> | any;
	message: string;
};
