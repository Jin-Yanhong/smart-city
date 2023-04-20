<template>
	<div ref="mapContainer" class="mapContainer"></div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted } from "vue";
import { initMap } from "./mapOperates";

const mapContainer = ref<HTMLDivElement>();
const emits = defineEmits(["onMapReady"]);

let mapIns = ref();

onMounted(() => {
	mapIns.value = initMap(mapContainer.value as HTMLDivElement);
	emits("onMapReady", mapIns.value);
});
</script>

<style lang="less">
.mapContainer {
	position: absolute;

	width: calc(100% - 40px);
	height: calc(100% - 40px);
}
</style>
