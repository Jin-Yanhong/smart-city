export type loginFormType = {
	userName: string;
	passWord: string;
};

export type responseData = {
	code: number;
	data: Array<any> | any;
	message: string;
};
export type menuConfigType = {
	uniqueOpened: boolean;
	collapseTransition: boolean;
	backgroundColor: string;
	activeTextColor: string;
	textColor: string;
};

export type requestIdleCallback = (res: responseData) => void;
