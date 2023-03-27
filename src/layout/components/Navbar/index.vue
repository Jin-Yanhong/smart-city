<template>
	<div class="navbar">
		<div class="nav flex-end">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<span class="userCenter"> User Center </span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleLogout">
							<el-icon>
								<SwitchButton />
							</el-icon>
							Logout
						</el-dropdown-item>
						<el-dropdown-item @click="drawer = true">
							<el-icon><Setting /></el-icon>
							打开设置
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

		<el-drawer v-model="drawer" title="系统设置" direction="rtl" :close-on-click-modal="false">
			<div class="flex-between">
				<span> 系统主题色 </span>

				<span>
					<el-color-picker v-model="themeColor" />
					<span>{{ themeColor }} </span>
				</span>
			</div>

			<ElDivider />
			<div class="flex-between">
				<span> 菜单布局 </span>
				<el-radio-group v-model="menuLayout">
					<el-radio-button label="horizontal" />
					<el-radio-button label="vertical" />
				</el-radio-group>
			</div>
		</el-drawer>
	</div>
</template>
<script lang="ts">
import useUserStore from "@/store/user";
import { ArrowDown, SwitchButton, Setting } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { defineComponent, ref } from "vue";

import { enumMenuLayout } from "@/enum";
interface tagViewsType {
	title: string;
	path: string;
	isActive: boolean;
}

export default defineComponent({
	name: "navBar",
	setup() {
		const user = useUserStore();
		const drawer = ref<boolean>(false);
		const themeColor = ref<string>("#409EFF");
		const menuLayout = ref<enumMenuLayout>(enumMenuLayout.horizontal);
		const tagViews = ref<Array<tagViewsType>>([]);
		return {
			user,
			drawer,
			tagViews,
			themeColor,
			menuLayout,
		};
	},
	components: {
		ArrowDown,
		SwitchButton,
		Setting,
	},

	methods: {
		handleLogout(): void {
			ElMessageBox.confirm("Are you confirm to logout ?", "Warning", {
				confirmButtonText: "I conform",
				cancelButtonText: "Cancle",
				type: "warning",
			}).then(() => {
				this.user.handleLogout();
				location.reload();
			});
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
	.nav {
		padding: 0 @layout-gap;
	}
}
</style>
