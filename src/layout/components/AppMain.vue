<template>
	<div class="appMain">
		<el-scrollbar style="width: 100%; height: 42px; background: #a6cfff">
			<div class="tagsContainer">
				<el-tag class="tagsView" size="large" :effect="homePathActive ? 'dark' : 'plain'">
					<router-link :class="homePathActive ? 'Active' : 'noActive'" :to="{ path: '/' }"> 首页 </router-link>
				</el-tag>
				<el-tag
					class="tagsView"
					size="large"
					v-for="tag in tagViews"
					:key="tag.path"
					closable
					@close="tagClose(tag)"
					:effect="tag.isActive ? 'dark' : 'plain'"
				>
					<router-link :class="['noActive', tag.isActive ? ' Active' : '']" :to="tag.path">
						{{ tag.title }}
					</router-link>
				</el-tag>
			</div>
		</el-scrollbar>
		<el-scrollbar class="routerViewContainer">
			<router-view />
		</el-scrollbar>
		<div class="copyrightContainer">
			{{ copyright }}
		</div>
	</div>
</template>
<script lang="ts" setup>
import { tagViewsType } from "@/types/index";
import useAppStore from "@/store/app";
import { computed, ref, watch } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import settings from "@/settings";

const app = useAppStore();
const homePath = "/system/dashboard";
const homePathActive = ref<boolean>(false);
const tagViews = ref<Array<tagViewsType>>([]);
const copyright = ref<string>(settings.appConfig.copyright);
const route: RouteLocationNormalizedLoaded = useRoute();
const sideBarWidth = computed(() => app.getSideBarWidth);

function tagClose(tag: tagViewsType) {
	const index = tagViews.value.indexOf(tag);
	tagViews.value.splice(index, 1);
}

watch(route, (current: RouteLocationNormalizedLoaded) => {
	const item: tagViewsType = {
		title: current.meta?.title as string,
		path: current.path,
		isActive: true,
	};

	if (current.path === homePath) {
		homePathActive.value = true;
		tagViews.value = tagViews.value.map(el => {
			return { ...el, isActive: false };
		});
	} else {
		homePathActive.value = false;
		tagViews.value = tagViews.value.map(el => {
			return { ...el, isActive: el.path === item.path };
		});
		const hasTag =
			tagViews.value.filter(el => {
				return el.path === item.path;
			}).length === 1;
		if (!hasTag) {
			tagViews.value.push({
				title: current.meta?.title as string,
				path: current.path,
				isActive: true,
			});
		}
	}
});
</script>

<style lang="less" scoped>
@import "@/assets/style/variable.less";

@menuwidth: v-bind(sideBarWidth);

.appMain {
	position: relative;
	height: calc(100vh - 58px);
	width: calc(100vw - @menuwidth);
	flex-grow: 1;
	.tagsContainer {
		display: flex;
		flex-wrap: nowrap;
		height: 32px;
		padding-bottom: 10px;
		background: @color-theme;
		overflow-x: auto;
		position: relative;

		.noActive {
			color: @color-dark;
		}
		.Active {
			color: @color-light;
		}

		:deep(.el-tag) {
			border-bottom-left-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
		}

		&::-webkit-scrollbar {
			position: absolute;
			bottom: 10px;
			width: 100%;
			height: 10px;
		}
		&::-webkit-scrollbar-button {
			display: none;
		}
		&::-webkit-scrollbar-track-piece {
			background: #efefef;
		}
		&::-webkit-scrollbar-thumb {
			background: #ccc;
			border-radius: 10px;
		}
	}
	.routerViewContainer {
		height: calc(100% - 74px);
		width: 100%;
	}
	.copyrightContainer {
		position: absolute;
		width: calc(100% - @layout-gap);
		height: 32px;
		padding-left: @layout-gap;
		line-height: 32px;
		background: @color-theme;
		color: @color-light;
		bottom: 0;
		right: 0;
		box-shadow: var(@box-shadow);
		z-index: 1;
	}
}
</style>
