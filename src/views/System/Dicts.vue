<template>
	<div class="view">
		<Crud />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { tableColumnProps } from '@/types/index';
defineOptions({
	name: 'SystemDicts',
});
</script>

<style lang="less" scoped>
//
</style>
