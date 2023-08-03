<template>
	<el-config-provider :locale="elocale">
		<router-view v-slot="{ Component }">
			<keep-alive :include="cachedViews">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</el-config-provider>
</template>
<script lang="js" setup>
import { computed } from 'vue';
import useAppStore from '@/store/app';
import { ElConfigProvider } from 'element-plus';
import zh from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const App = useAppStore();
const locale = computed(() => App.getLocale);
const cachedViews = computed(() => App.getCachedViews);
const elocale = computed(() => (locale.value === 'zh' ? zh : en))
App.setLocale(locale.value)
</script>
