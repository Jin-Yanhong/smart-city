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

	const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

	viewer.camera.flyTo({
		destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
		orientation: {
			heading: Cesium.Math.toRadians(0.0),
			pitch: Cesium.Math.toRadians(-15.0),
		},
	});
});
</script>

<style lang="less">
.cesiumContainer {
	position: absolute;
	top: 20px;
	left: 20px;
	width: calc(100% - 40px);
	height: calc(100% - 40px);
}
</style>
