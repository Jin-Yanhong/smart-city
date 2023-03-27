<template>
	<div class="app-container">
		<Navbar class="navbar" />
		<div class="flex-nowrap">
			<Sidebar />
			<AppMain class="appMain" style="flex-grow: 1" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
import settings from "@/settings";
export default defineComponent({
	setup() {
		const sidebarWidth = ref<string>(settings.appConfig.layOut.menuWidth);
		const isCollapse = ref<boolean>(false);

		return {
			sidebarWidth,
			isCollapse,
		};
	},
	name: "Layout",
	components: {
		Sidebar,
		Navbar,
		AppMain,
	},

	methods: {
		onSwitchCollapse(isCollapse: boolean) {
			this.isCollapse = isCollapse;
		},
	},
});
</script>
<style lang="less" scoped>
.app-container {
	height: 100vh;
	.appMain {
		height: calc(100vh - 58px);
	}

	.noCollapse {
		width: 64px;
	}
	.yesCollapse {
		width: v-bind(sidebarWidth);
	}
}
</style>
