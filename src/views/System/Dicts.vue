<template>
	<div class="view">
		<Crud api="abc">
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
			<ElTableColumn prop="date" label="Date" width="180"></ElTableColumn>
		</Crud>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { tableColumnProps } from '@/types/index';
import { ElTableColumn } from 'element-plus';
import Crud from '@/components/Crud/index.vue';
defineOptions({
	name: 'SystemDicts',
});
</script>

<style lang="less" scoped>
//
</style>
