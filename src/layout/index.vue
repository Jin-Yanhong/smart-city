<template>
	<div class="app-container">
		<Navbar class="navbar" />
		<div class="flex-nowrap">
			<Sidebar />
			<AppMain class="appMain" style="flex-grow: 1" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
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
}
</style>
