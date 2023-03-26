<template>
	<ElSubMenu v-if="item?.children?.length as number > 1" :index="basePath">
		<template v-slot:title>
			<div>
				<el-icon color="#409EFC"> <component :is="item?.meta?.icon" /> </el-icon>
				<slot name="title"> {{ item.meta?.title }} </slot>
			</div>
		</template>
		<SidebarItem v-for="child in item.children" v-bind:key="child.path" :item="child" :basePath="basePath" />
	</ElSubMenu>

	<ElMenuItem v-else v-show="item.meta?.show" :index="resolvePath([basePath, '/', item.path])">
		<router-link :to="resolvePath([basePath, '/', item.path])" style="flex: 1">
			<el-icon color="#409EFC"> <component :is="item?.meta?.icon" /> </el-icon>
			<span> {{ item.meta?.title }} </span>
		</router-link>
	</ElMenuItem>
</template>

<script lang="ts">
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";

function registerIcon() {
	const icon: any = {};
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		icon[key] = component;
	}
	return icon;
}

export default defineComponent({
	props: {
		item: { type: Object as PropType<RouteRecordRaw>, required: true },
		basePath: { type: String, required: true },
	},
	name: "SidebarItem",
	components: {
		ElSubMenu,
		ElMenuItem,
		...registerIcon(),
	},
	methods: {
		resolvePath(paths: string[]) {
			const pathNode: string[] = paths.join("").replace(/\//g, " ").split(" ");
			const result: string = Array.from(new Set(pathNode)).join("/");
			return result;
		},
	},
});
</script>

<style lang="scss" scoped></style>
