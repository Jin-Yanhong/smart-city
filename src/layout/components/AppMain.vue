<template>
	<div class="appMain">
		<div class="tagsContainer">
			<el-tag class="tagsView" size="large" effect="plain">
				<router-link class="noActive" :to="{ path: '/' }"> 首页 </router-link>
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
		<router-view />
		<div class="copyrightContainer">
			{{ copyright }}
		</div>
	</div>
</template>
<script lang="ts">
import { tagViewsType } from "@/types/index";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import settings from "@/settings";
export default defineComponent({
	name: "App_Main",
	setup() {
		const defaultRouter = ref("/");
		const current = useRoute();
		const tagViews = ref<Array<tagViewsType>>([]);
		const sidebarWidth = ref<string>(settings.appConfig.layOut.menuWidth);
		const copyright = ref<string>(settings.appConfig.copyright);
		return {
			current,
			tagViews,
			copyright,
			sidebarWidth,
			defaultRouter,
		};
	},
	watch: {
		$route: function (nVal) {
			const item: tagViewsType = {
				title: nVal.meta?.title,
				path: nVal.path,
				isActive: true,
			};
			if (nVal.path === "/dashboard") {
				this.tagViews = this.tagViews.map(el => {
					return { ...el, isActive: false };
				});
			} else {
				this.tagViews = this.tagViews.map(el => {
					return { ...el, isActive: el.path === item.path };
				});
				const hasTag =
					this.tagViews.filter(el => {
						return el.path === item.path;
					}).length === 1;
				if (!hasTag) {
					this.tagViews.push({
						title: nVal.meta?.title,
						path: nVal.path,
						isActive: true,
					});
				}
			}
		},
	},
	methods: {
		tagClose(tag: tagViewsType) {
			const index = this.tagViews.indexOf(tag);
			this.tagViews.splice(index, 1);
		},
	},
});
</script>

<style lang="less" scoped>
@import "@/assets/style/variable.less";
@menuwidth: v-bind(sidebarWidth);

.appMain {
	position: relative;
}
.tagsContainer {
	display: flex;
	flex-wrap: nowrap;
	background: @color-theme;
	width: calc(100vw - @menuwidth);
	overflow-x: auto;
	position: relative;

	.noActive {
		color: @color-dark;
	}
	.Active {
		color: @color-light;
	}

	::v-deep(.el-tag) {
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
}
</style>
