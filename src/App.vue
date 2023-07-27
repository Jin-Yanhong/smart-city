<template>
	<el-config-provider :locale="elocale">
		<router-view v-slot="{ Component }">
			<keep-alive :include="['FlatMap', 'ReliefMap']">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</el-config-provider>
</template>
<script lang="js" setup>
import { computed } from 'vue';
import useAppStore from '@/store/app';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const App = useAppStore();
const locale = computed(() => App.getLocale);
const elocale = computed(() => (locale.value === 'zh' ? zhCn : en))
App.setLocale(locale.value)
</script>
