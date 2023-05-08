<template>
	<div class="FullScreen">
		<canvas ref="threeContainer" class="threeContainer"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { initCity } from "@/components/Three/index";

const threeContainer = ref<HTMLCanvasElement>();

onMounted(() => {
	initCity(threeContainer.value as HTMLCanvasElement);
});
</script>

<style lang="less" scoped>
@import "@/assets/style/variable.less";

.threeContainer {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #ccc;
}
</style>
