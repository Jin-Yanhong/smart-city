<template>
	<div class="view">
		<el-calendar v-model="value" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/runtime-core';

defineOptions({
	name: 'SystemMain',
});
const value = ref<Date>();
</script>

<style></style>
