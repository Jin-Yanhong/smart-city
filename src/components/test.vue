<template>
	<div>
		<div style="color: red">
			<slot name="before"> </slot>
		</div>
		<div style="color: green">
			<slot> </slot>
		</div>

		<div style="color: blue">
			<slot name="after"> </slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

defineOptions({
	name: 'Test',
});
const slots = defineSlots();

onMounted(() => {
	setTimeout(() => {
		console.log(slots);
	}, 2000);
});
</script>
