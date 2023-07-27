import type { FormRules } from 'element-plus';

const rules: FormRules = {
	name: [
		{
			required: true,
			message: '名称不能为空!',
			trigger: ['change', 'blur', 'input'],
		},
	],
};

export { rules };

export function isEmail(email: string): boolean {
	let flag: boolean = false;
	return flag;
}
