<template>
	<div class="view">
		<MapOl @onMapReady="onMapReady" />
		<div ref="overlayContainer" class="overlay">Hello, I'm here</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Map from "ol/Map";
import MapOl from "@/components/Map/index.vue";
import { myOverlay } from "@/components/Map/mapOperates";
const overlayContainer = ref<HTMLDivElement>();

const mapIns = ref<Map>();
const onMapReady = (Ins: Map) => {
	mapIns.value = Ins;
	const overlay = myOverlay(overlayContainer.value as HTMLDivElement);
	mapIns.value.addOverlay(overlay);
	mapIns.value?.on("click", function (e) {
		overlay.setPosition(e.coordinate);
	});
};
</script>
<script lang="ts">
export default {
	name: "FlatMap",
};
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";

.overlay {
	background: #fff;
	color: #999;

	border-radius: 4px;
	padding: @layout-gap;
}
</style>
