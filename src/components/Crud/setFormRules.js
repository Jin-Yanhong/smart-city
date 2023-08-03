const rules = {
	date: [{ required: true, message: 'Date不能为空', trigger: ['blur', 'change'] }],
	name: [{ required: true, message: 'Name不能为空', trigger: ['blur', 'change'] }],
	state: [{ required: true, message: 'State不能为空', trigger: ['blur', 'change'] }],
	city: [{ required: true, message: 'City不能为空', trigger: ['blur', 'change'] }],
	address: [{ required: true, message: 'Address不能为空', trigger: ['blur', 'change'] }],
	zip: [{ required: true, message: 'Zip不能为空', trigger: ['blur', 'change'] }],
};

export function formRules(form) {
	let rule = {};
	Object.keys(form).forEach(key => {
		rule[key] = rules[key];
	});
	return rule;
}
