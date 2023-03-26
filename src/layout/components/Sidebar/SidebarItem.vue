<template>
	<div v-if="item?.children?.length as number > 1">
		{{ item.children }}
		<ElSubMenu :index="fatherPath">
			<template v-slot:title>
				<span>
					<el-icon color="#409EFC"> <component :is="item?.meta?.icon" /> </el-icon>
					<slot name="title"> {{ item.meta?.title }} </slot>
				</span>
			</template>
			<SidebarItem v-for="child in item.children" v-bind:key="child.path" :item="child" :basePath="fatherPath" />
		</ElSubMenu>
	</div>
	<div v-else>
		<router-link v-show="item.meta?.show" :to="item.path">
			<ElMenuItem>
				<el-icon color="#409EFC"> <component :is="item?.meta?.icon" /> </el-icon>
				<span> {{ item.meta?.title }} </span>
			</ElMenuItem>
		</router-link>
	</div>
</template>

<script lang="ts">
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { defineComponent, PropType, ref } from "vue";
import { RouteRecordRaw } from "vue-router";

function registerIcon() {
	const icon: any = {};
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		icon[key] = component;
	}
	return icon;
}

export default defineComponent({
	setup(props: any) {
		const fatherPath = ref(props.basePath);
		return {
			fatherPath,
		};
	},
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
		// routerPath(item: RouteRecordRaw): string {
		// 	const path = this.fatherPath === "/" ? "/" + item.path : this.fatherPath + "/" + item.path;
		// 	return path;
		// },
	},
});
</script>

<style lang="scss" scoped></style>
