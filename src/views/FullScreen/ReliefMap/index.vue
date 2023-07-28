<template>
	<div class="FullScreen">
		<CesiumMap />
	</div>
</template>

<script lang="ts" setup>
import CesiumMap from '@/components/CesiumMap/index.vue';
defineOptions({
	name: 'CesiumMap',
});
</script>

<script lang="ts">
export default {
	name: 'ReliefMap',
};
</script>

<style></style>
