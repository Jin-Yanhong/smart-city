<template>
	<div class="view flex-center">
		<div class="loginForm">
			<el-card shadow="never">
				<template #header>
					<div class="card-header">
						<span>Welcome to {{ AppName }}</span>
					</div>
				</template>
				<ElForm :model="form" :label-width="labelWidth" label-position="left" ref="loginFormRef" :rules="rules">
					<el-form-item label="User Name" prop="userName" required>
						<el-input v-model="form.userName" autocomplete="off" placeholder="your user name" />
					</el-form-item>
					<el-form-item label="User Password" prop="passWord" required>
						<el-input type="password" v-model="form.passWord" placeholder="password" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit(loginFormRef)">Login</el-button>
					</el-form-item>
				</ElForm>
			</el-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import route from "@/router";
import useUserStore from "@/store/user";
import { loginFormType } from "@/types";
import settings from "@/settings";
import type { FormInstance, FormRules } from "element-plus";
import { onMounted, reactive, ref } from "vue";

const form = reactive<loginFormType>({ userName: "admin", passWord: "admin" });
const AppName = ref<string>("");
const user = useUserStore();
const labelWidth = ref("140px");
const loginFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
	userName: [
		{
			required: true,
			message: "Please input user name",
			trigger: "blur",
		},
	],
	passWord: [
		{
			required: true,
			message: "Please select user password",
			trigger: "change",
		},
	],
});

async function onSubmit(formEl: FormInstance | undefined) {
	if (!formEl) return;
	await formEl.validate(valid => {
		if (valid) {
			user.handleLogin(form);
			setTimeout(() => {
				route.replace("/");
			}, 200);
		}
	});
}

onMounted(() => {
	AppName.value = settings.appName as string;
});
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";

.view {
	height: 100vh;
	background: #1abc9c;

	.loginForm {
		width: 400px;
		:deep(.el-form-item__content) {
			width: calc(100% - v-bind(labelWidth));
		}
	}
}
</style>
