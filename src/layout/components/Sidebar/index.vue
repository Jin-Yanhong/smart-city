<template>
	<div class="sidebar">
		<div class="flex-end">
			<el-button type="default" size="small" @click="isCollapse = !isCollapse">
				<el-icon>
					<component :is="isCollapse ? 'DArrowRight' : 'DArrowLeft'" />
				</el-icon>
			</el-button>
		</div>

		<ElMenu
			:default-active="activeMenu"
			:unique-opened="menuConfig.uniqueOpened"
			:collapse-transition="menuConfig.collapseTransition"
			:collapse="isCollapse"
			:background-color="menuConfig.backgroundColor"
			:active-text-color="menuConfig.activeTextColor"
			:text-color="menuConfig.textColor"
			mode="vertical"
		>
			<SidebarItem v-for="route in routerList" :key="route.path" :item="route" :basePath="route.path" />
		</ElMenu>
	</div>
</template>

<script lang="ts">
import { routes } from "@/router";
import settings from "@/settings";
import { defineComponent, ref } from "vue";
import SidebarItem from "./SidebarItem.vue";
import { RouteRecordRaw } from "vue-router";

import { DArrowRight, DArrowLeft } from "@element-plus/icons-vue";
export default defineComponent({
	setup() {
		const menuConfig = ref(settings.menuConfig);
		const isCollapse = ref<boolean>(true);
		const routerList = ref<Array<RouteRecordRaw>>(routes);

		return {
			menuConfig,
			isCollapse,
			routerList,
		};
	},
	name: "Side_bar",
	components: {
		SidebarItem,
		DArrowRight,
		DArrowLeft,
	},
	computed: {
		activeMenu(): string {
			return this.$route.path;
		},
	},
});
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";

.sidebar {
	background-color: @color-layout-bg-navbar;
	:deep(.el-menu) {
		border: none;
	}
}
</style>
