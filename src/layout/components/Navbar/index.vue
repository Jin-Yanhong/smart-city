<template>
	<div class="navbar flex">
		<div class="flex-between-column">
			<div style="flex-grow: 2">
				<el-breadcrumb v-if="current.path === '/dashboard'">
					<el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
				</el-breadcrumb>
				<el-breadcrumb v-else separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item
						v-for="(item, index) in breadcrumbList"
						:key="item.path + index"
						:to="{ path: item.path }"
					>
						{{ item.meta.title }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div>
				<el-tag class="tagsView" :effect="current.path === '/dashboard' ? 'dark' : 'light'">
					<router-link
						:class="['noActive', current.path === '/dashboard' ? ' Active' : '']"
						:to="{ path: '/' }"
					>
						首页
					</router-link>
				</el-tag>
				<el-tag
					class="tagsView"
					v-for="tag in tagViews"
					:key="tag.path"
					closable
					@close="tagClose(tag)"
					:effect="tag.isActive ? 'dark' : 'light'"
				>
					<router-link :class="['noActive', tag.isActive ? ' Active' : '']" :to="tag.path">
						{{ tag.title }}
					</router-link>
				</el-tag>
			</div>
		</div>
		<div style="flex-grow: 1" />
		<div>
			<el-dropdown>
				<span class="el-dropdown-link">
					<span class="userCenter"> User Center </span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<!-- <el-dropdown-item divided></el-dropdown-item> -->
						<el-dropdown-item @click="handleLogout">
							<el-icon class="el-icon--right">
								<SwitchButton />
							</el-icon>
							Logout
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts">
import { routes } from "@/router";
import useUserStore from "@/store/user";
import { ArrowDown, SwitchButton } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { defineComponent, ref } from "vue";
import { RouteLocationMatched, useRoute } from "vue-router";

interface tagViewsType {
	title: string;
	path: string;
	isActive: boolean;
}

export default defineComponent({
	name: "nav_Bar",
	setup() {
		const routerList = routes;
		const user = useUserStore();
		const current = useRoute();
		const breadcrumbList = ref<Array<RouteLocationMatched>>(current.matched);
		const tagViews = ref<Array<tagViewsType>>([]);
		return {
			routerList,
			user,
			current,
			breadcrumbList,
			tagViews,
		};
	},
	components: {
		ArrowDown,
		SwitchButton,
	},
	watch: {
		$route: function (nVal, oVal) {
			this.breadcrumbList = nVal.matched;
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
	computed: {
		activeMenu(): string {
			const route = this.$route;
			const path = route.path;
			return path;
		},
	},
	methods: {
		handleLogout(): any {
			ElMessageBox.confirm("Are you confirm to logout ?", "Warning", {
				confirmButtonText: "I conform",
				cancelButtonText: "Cancle",
				type: "warning",
			}).then(() => {
				this.user.handleLogout();
				location.reload();
			});
		},
		tagClose(tag: tagViewsType) {
			if (this.tagViews.length === 1) {
				return;
			} else {
				const index = this.tagViews.indexOf(tag);
				this.tagViews.splice(index, 1);
			}
		},
	},
});
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";

.navbar {
	background-color: @color-layout-bg-navbar;
	padding-left: 12px;
	.userCenter {
		color: #fff;
		line-height: 58px;
		cursor: pointer;
	}

	.flex-between-column {
		height: 100%;
	}
	::v-deep(.el-tag) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	::v-deep(.el-breadcrumb) {
		line-height: 34px;
		.el-breadcrumb__inner {
			color: #fff !important;
		}
	}
	.noActive {
		color: var(--el-color-primary);
	}

	.Active {
		color: #fff;
	}
}
</style>
