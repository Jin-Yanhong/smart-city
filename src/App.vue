<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>
</template>
<script lang="js">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default defineComponent({
	components: {
		ElConfigProvider,
	},
	setup() {
		return {
			locale: zhCn,
		};
	},
});
</script>
