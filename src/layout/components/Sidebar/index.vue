<template>
	<div class="sidebarCom">
		<el-scrollbar>
			<div class="btn" @click="switchCollapse">
				<el-icon><component :is="isCollapse ? Expand : Fold" /></el-icon>
			</div>

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
import { System } from "@/router/System";
import { Fold, Expand } from "@element-plus/icons-vue";
import { ref, computed, reactive } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import { menuConfigType } from "@/types";
import useAppStore from "@/store/app";
import settings from "@/settings";

const app = useAppStore();
const currentRoute = useRoute();
const isCollapse = ref<boolean>(app.getMenuCollapse);
const routerList = ref<Array<RouteRecordRaw>>(System);
const activeMenu = computed(() => currentRoute.path);
const menuConfig = reactive<menuConfigType>({ ...settings.menuConfig });
const sideBarWidth = ref<string>(isCollapse.value ? settings.appConfig.layOut.minWidth : settings.appConfig.layOut.maxWidth);

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	sideBarWidth.value = isCollapse.value ? settings.appConfig.layOut.minWidth : settings.appConfig.layOut.maxWidth;
	app.switchMenuCollapse(isCollapse.value);
}
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
		font-size: 24px;
		top: 50%;
		right: 0;
		z-index: 1;
		cursor: pointer;
		:deep(.el-icon) {
			color: #fff;
		}
	}

	[role="menubar"] {
		transition: all 0.3s;
		max-width: v-bind(sideBarWidth);
		min-width: v-bind(sideBarWidth);
	}
}
</style>
