<template>
	<div class="Crud">
		<el-table ref="crudTableRef" :data="tableData" style="width: 100%" @selection-change="onSelectionChange">
			<el-table-column type="selection" width="55" />
			<el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :align="column.align" :label="column.label"></el-table-column>
		</el-table>
		<div>
			<span v-for="column in columns" :key="column.prop"> {{ column.label }} </span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { tableRowData, tableColumnProps } from '@/types/index';
import type { TableInstance } from 'element-plus';
import { loadData } from '@/api/home';
defineOptions({
	name: 'Crud',
});

export interface Props {
	columns?: Array<tableColumnProps>;
}

const curdProps = withDefaults(defineProps<Props>(), {
	// columns: () => [],
});

const tableData = reactive<Array<tableRowData>>([]);

const crudTableRef = ref<TableInstance>();

// function identity<Type>(arg: Type): Type {
//   return arg;
// }

onMounted(() => {
	loadData(res => {
		console.log(res);
	});
});
function onSelectionChange(selections: Array<tableRowData>): void {
	console.log(selections);
}
</script>

<style lang="less" scoped>
//
</style>
