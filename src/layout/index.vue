<template>
	<div class="app-container">
		<Navbar class="navbar" />
		<div class="flex-nowrap" style="flex-grow: 1">
			<Sidebar />
			<AppMain />
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar/index.vue';
import Sidebar from './components/Sidebar/index.vue';

defineOptions({
	name: 'LayOut',
});
</script>
<style lang="less" scoped>
.app-container {
	height: 100vh;
	// display: flex;
}
</style>
