<template>
	<div class="navbar flex">
		<div class="logo flex-center">
			<span class="img">
				<el-avatar :size="40" :src="avatarUrl" />
			</span>
			<span class="name" @click="toHome">
				{{ $t(appName) }}
			</span>
		</div>
		<div class="contentNav">
			<ul class="flex-start">
				<li v-for="nav in contentNav" :key="nav.id" @click="switchNav(nav)">
					<router-link :to="nav.path">
						<span>{{ $t(nav.label) }}</span> <i> </i>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="nav flex-end">
			<el-dropdown trigger="click" class="marginR">
				<span class="el-dropdown-link">
					<span class="userCenter">
						<el-icon>
							<Bicycle />
						</el-icon>
						{{ $t('system.language') }}
					</span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="switchLanguage('en')"> English </el-dropdown-item>
						<el-dropdown-item @click="switchLanguage('zh')"> 中文 </el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<el-dropdown trigger="click" class="marginL">
				<span class="el-dropdown-link">
					<span class="userCenter">
						<el-icon>
							<Avatar />
						</el-icon>
						{{ $t('system.user') }}
					</span>
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
							<el-icon>
								<Setting />
							</el-icon>
							打开设置
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<el-drawer class="userDrawer" v-model="drawer" title="系统设置" direction="rtl" size="360" :close-on-click-modal="false">
			<div class="flex-between">
				<span> 系统主题色 </span>
				<span class="flex-center">
					<el-color-picker v-model="sysConfig.themeColor" />
					<span class="marginL">{{ sysConfig.themeColor }} </span>
				</span>
			</div>
			<div class="hr"></div>
			<div class="flex-between">
				<span> 系统高亮色 </span>
				<span class="flex-center">
					<el-color-picker v-model="sysConfig.activeColor" />
					<span class="marginL">{{ sysConfig.activeColor }} </span>
				</span>
			</div>
			<div class="hr"></div>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { ArrowDown, SwitchButton, Setting, Bicycle, Avatar } from '@element-plus/icons-vue';
import useUserStore from '@/store/user';
import useAppStore from '@/store/app';
import { fullScreen } from '@/router/FullScreen';
import { contentNavType } from '@/types';
import settings from '@/settings';

defineOptions({
	name: 'NavBar',
});

const avatarUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
const user = useUserStore();
const app = useAppStore();

const drawer = ref<boolean>(false);
const sysConfig = reactive({
	themeColor: settings.appConfig.themeColor,
	activeColor: settings.appConfig.activeColor,
});

const sideBarWidth = ref<string>(settings.appConfig.layOut.maxWidth);
const appName = ref<string>(settings.appConfig.name);

const contentNav = ref<Array<contentNavType> | undefined>([]);

contentNav.value = fullScreen[0].children?.map((el, index) => {
	return {
		id: index + 1,
		label: el?.meta?.title as string,
		path: el.path,
	};
});

function handleLogout(): void {
	ElMessageBox.confirm('Are you confirm to logout ?', 'Warning', {
		confirmButtonText: 'I conform',
		cancelButtonText: 'Cancle',
		type: 'warning',
	}).then(() => {
		user.handleLogout();
		location.reload();
	});
}

function switchNav(nav: contentNavType) {
	router.push(nav.path);
}

function toHome() {
	router.push('/');
}

function switchLanguage(locale: string) {
	app.setLocale(locale);
}
</script>
<style lang="less" scoped>
@import '@/assets/style/variable.less';

.navbar {
	min-width: 900px;
	position: relative;
	z-index: 3;
	background-color: @color-layout-bg-navbar;
	box-shadow: var(@box-shadow);

	.logo {
		width: v-bind(sideBarWidth);
		color: #fff;
		user-select: none;

		.img {
			margin-right: @layout-gap;
		}

		.name {
			cursor: pointer;

			&:hover {
				color: @color-active;
			}
		}
	}

	.contentNav {
		* {
			user-select: none;
		}

		ul {
			padding-left: 2 * @layout-gap;

			li {
				user-select: none;
				text-align: center;
				cursor: pointer;
				box-sizing: border-box;
				color: @color-light;
				height: 58px;
				line-height: 58px;
				margin: 0 2 * @layout-gap;
				border-bottom: 4px solid transparent;
				transition: all 0.2s;
				position: relative;

				i {
					position: absolute;
					bottom: -4px;
					left: -20%;
					width: 0;
					height: 4px;
					background: #feca57;
					transition: 0.3s all ease-in-out;
				}

				&:hover {
					i {
						width: 100%;
						transform: translateX(20%);
					}
				}
			}
		}
	}

	.userCenter {
		color: #fff;
		line-height: 58px;
		cursor: pointer;

		// 点亮右侧下拉箭头
		& + .el-icon {
			color: #fff;
		}
	}

	.nav {
		flex: 1;
		padding: 0 @layout-gap;
	}

	.marginL {
		display: inline-block;
		width: 80px;
	}
}
</style>
