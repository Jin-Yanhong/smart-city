<template>
	<div class="sidebarCom">
		<el-button
			class="btn"
			type="default"
			size="small"
			@click="switchCollapse"
			:icon="isCollapse ? DArrowRight : DArrowLeft"
		/>

		<ElMenu
			:default-active="activeMenu"
			:default-openeds="defaultOpened"
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

<script lang="ts" setup>
import { routes } from "@/router";
import { ref, computed, defineEmits, reactive } from "vue";
import SidebarItem from "./SidebarItem.vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import { DArrowRight, DArrowLeft } from "@element-plus/icons-vue";
import settings from "@/settings";
import { menuConfigType } from "@/types";

const emit = defineEmits(["onSwitchCollapse"]);
const currentRoute = useRoute();
const menuConfig = reactive<menuConfigType>({ ...settings.menuConfig });
const isCollapse = ref<boolean>(false);
const routerList = ref<Array<RouteRecordRaw>>(routes);
const activeMenu = computed(() => currentRoute.path);
const sidebarWidth = ref<string>(settings.appConfig.layOut.menuWidth);
const defaultOpened = ["/system", "index"];

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	// TODO:
	sidebarWidth.value = isCollapse.value ? "64px" : settings.appConfig.layOut.menuWidth;
	emit("onSwitchCollapse", isCollapse.value as boolean);
}
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";
.sidebarCom {
	position: relative;
	background-color: @color-layout-bg-navbar;
	:deep(.el-menu) {
		border: none;
	}
	.btn {
		position: absolute;
		top: 50%;
		right: 0;
		z-index: 1;
	}

	[role="menubar"] {
		transition: all 0.3s !important;
		// TODO:
		// min-width: v-bind(sidebarWidth);
	}
}
</style>
