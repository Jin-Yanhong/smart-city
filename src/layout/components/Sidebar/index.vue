<template>
	<div class="sidebarCom">
		<el-button class="btn" type="default" size="small" @click="switchCollapse" :icon="isCollapse ? DArrowRight : DArrowLeft" />

		<div class="scrollY" style="height: 100%">
			<ElMenu
				:default-active="activeMenu"
				:unique-opened="menuConfig.uniqueOpened"
				:collapse-transition="menuConfig.collapseTransition"
				:collapse="isCollapse"
				:background-color="menuConfig.backgroundColor"
				:active-text-color="menuConfig.activeTextColor"
				:text-color="menuConfig.textColor"
				:router="true"
				mode="vertical"
			>
				<SidebarItem v-for="route in routerList" :key="route.path" :item="route" :basePath="route.path" />
			</ElMenu>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { system } from "@/router/module/System";
import { flatMap } from "@/router/module/FlatMap";
import { reliefMap } from "@/router/module/ReliefMap";
import { spaceModel } from "@/router/module/SpaceModel";
import { DArrowRight, DArrowLeft } from "@element-plus/icons-vue";
import { ref, computed, reactive, watch } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import { menuConfigType } from "@/types";
import useAppStore from "@/store/app";
import settings from "@/settings";
import { routeMapKeys } from "@/interface/index";
import router from "@/router";

const routesMap: Record<keyof routeMapKeys, RouteRecordRaw[]> = {
	system: system,
	flatMap: flatMap,
	reliefMap: reliefMap,
	spaceModel: spaceModel,
};

const app = useAppStore();
const currentRoute = useRoute();
const menuConfig = reactive<menuConfigType>({ ...settings.menuConfig });
const isCollapse = ref<boolean>(false);
const activeMenu = computed(() => currentRoute.path);
const sidebarWidth = ref<string>(settings.appConfig.layOut.menuWidth);
const path = computed(() => app.getCurrentPath);
const pathStatic = app.getCurrentPath;

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	sidebarWidth.value = isCollapse.value ? "64px" : settings.appConfig.layOut.menuWidth;
}

const routerList = ref<Array<RouteRecordRaw>>(routesMap[pathStatic]);

watch(path, path => {
	router.push(`/${path}`);
	routerList.value = routesMap[path];
});
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
		transition: all 0.3s ease-in-out;
		min-width: v-bind(sidebarWidth);
	}
}
</style>
