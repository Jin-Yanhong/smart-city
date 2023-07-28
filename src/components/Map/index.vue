<template>
	<div class="mapContainer">
		<div ref="mapContainer" id="mapContainer"></div>
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'MapContainer',
});
import { ref, onMounted } from 'vue';
import { initMap } from './mapOperates';

const mapContainer = ref<HTMLDivElement>();
const emits = defineEmits(['onMapReady']);

let mapIns = ref();

onMounted(() => {
	mapIns.value = initMap(mapContainer.value as HTMLDivElement);
	emits('onMapReady', mapIns.value);
});
</script>

<style lang="less">
.mapContainer {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 0;
	#mapContainer {
		width: 100%;
		height: 100%;
	}
}
</style>
