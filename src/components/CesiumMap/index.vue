<template>
	<div ref="cesiumContainer" class="cesiumContainer"></div>
</template>

<script lang="ts" setup>
import * as Cesium from "cesium";
import { cesiumAccessToken } from "@/config";
import { ref, onMounted } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";

Cesium.Ion.defaultAccessToken = cesiumAccessToken;
const cesiumContainer = ref<HTMLDivElement>();

onMounted(() => {
	const viewer = new Cesium.Viewer(cesiumContainer.value as HTMLDivElement, {
		terrainProvider: Cesium.createWorldTerrain(),
	});
});
</script>

<style lang="less">
.cesiumContainer {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
