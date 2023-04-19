<template>
	<div class="sidebarCom">
		<el-scrollbar>
			<el-button class="btn" type="default" size="small" @click="switchCollapse" :icon="isCollapse ? DArrowRight : DArrowLeft" />
			<div class="scrollY">
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
		</el-scrollbar>
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
const sidebarWidth = ref<string>(settings.appConfig.layOut.maxWidth);
const path = computed(() => app.getCurrentPath);
const pathStatic = app.getCurrentPath;

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	sidebarWidth.value = isCollapse.value ? settings.appConfig.layOut.minWidth : settings.appConfig.layOut.maxWidth;
	app.switchSideBarWidth(sidebarWidth.value);
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
	background-color: @color-layout-bg-navbar;
	height: calc(100vh - 58px);
	position: relative;
	position: relative;
	z-index: 2;
	box-shadow: var(@box-shadow);
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
		transition: all 0.3s;
		max-width: v-bind(sidebarWidth);
		min-width: v-bind(sidebarWidth);
	}
}
</style>
