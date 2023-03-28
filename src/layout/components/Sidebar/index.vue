<template>
	<div class="sidebarCom">
		<el-button class="btn" type="default" size="small" @click="switchCollapse" :icon="isCollapse ? DArrowRight : DArrowLeft" />

		<div>
			<ElMenu
				:default-active="activeMenu"
				:default-openeds="defaultOpened"
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
import { routes } from "@/router";
import { system } from "@/router/module/System";
import { flatMap } from "@/router/module/FlatMap";
import { reliefMap } from "@/router/module/ReliefMap";
import { spaceModel } from "@/router/module/SpaceModel";
import { DArrowRight, DArrowLeft } from "@element-plus/icons-vue";
import { ref, computed, reactive, watch } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import { menuConfigType, RouterListKey } from "@/types";
import useAppStore from "@/store/app";
import settings from "@/settings";

const app = useAppStore();
const currentRoute = useRoute();
const menuConfig = reactive<menuConfigType>({ ...settings.menuConfig });
const isCollapse = ref<boolean>(false);
const activeMenu = computed(() => currentRoute.path);
const sidebarWidth = ref<string>(settings.appConfig.layOut.menuWidth);
const defaultOpened = ["/system", "index"];
const path = computed(() => app.getCurrentPath);

const emit = defineEmits(["onSwitchCollapse"]);

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	sidebarWidth.value = isCollapse.value ? "64px" : settings.appConfig.layOut.menuWidth;
	emit("onSwitchCollapse", isCollapse.value as boolean);
}

const routerList = ref<Array<RouteRecordRaw>>(routes);

watch(path, path => {
	switch (path) {
		case "routes":
			routerList.value = routes;
			break;

		case "system":
			routerList.value = system;
			break;

		case "flatMap":
			routerList.value = flatMap;
			break;

		case "reliefMap":
			routerList.value = reliefMap;
			break;

		case "spaceModel":
			routerList.value = spaceModel;
			break;

		default:
			routerList.value = routes;
			break;
	}
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
