<template>
	<div class="sidebar">
		<el-menu
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
		</el-menu>
	</div>
</template>

<script lang="ts">
import { routes } from "@/router";
import settings from "@/settings";
import { defineComponent, ref } from "vue";
import SidebarItem from "./SidebarItem.vue";
export default defineComponent({
	setup() {
		const menuConfig = ref(settings.menuConfig);
		const isCollapse = ref<boolean>(false);
		const routerList = routes;
		return {
			menuConfig,
			isCollapse,
			routerList,
		};
	},
	name: "Side_bar",
	components: {
		SidebarItem,
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
