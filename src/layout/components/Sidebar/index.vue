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
			class="el-menu-vertical-demo"
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

console.log(activeMenu.value);

const defaultOpened = ["/system", "index"];

function switchCollapse() {
	isCollapse.value = !isCollapse.value;
	emit("onSwitchCollapse", isCollapse.value as boolean);
}
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";
.sidebarCom {
	position: relative;
	background-color: @color-layout-bg-navbar;
	transition-delay: 0;
	transition-duration: 0.3s;
	transition-property: width;
	transition-timing-function: ease-in-out;

	:deep(.el-menu) {
		border: none;
	}
	.btn {
		position: absolute;
		top: 50%;
		right: 0;
		z-index: 1;
	}
}
</style>
