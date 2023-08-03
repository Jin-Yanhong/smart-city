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

export type contentNavType = {
	id: number;
	label: string;
	path: string;
};

export type tagViewsType = {
	title: string;
	path: string;
	isActive: boolean;
};

export type requestCallback = (res: responseData) => void;

export type tableRowData = {
	[key: string]: string | number | boolean | Date | any[];
};

export type tableColumnProps = {
	type: 'selection' | undefined;
	label: string;
	prop: string;
	align: 'left' | 'center' | 'right';
	fixed: 'left' | 'right';
};

export type crudQueryParams = {
	size: number;
	page: number;
	[key: string]: any;
};
