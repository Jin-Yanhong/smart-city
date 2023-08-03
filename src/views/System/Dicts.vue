<template>
	<div class="view">
		<Crud tableName="字典项" :crud="dictCrud">
			<template v-slot:query="query">
				<el-form-item label="Date" prop="date">
					<el-input v-model="query.date" />
				</el-form-item>
				<el-form-item label="Name" prop="name">
					<el-input v-model="query.name" />
				</el-form-item>
				<el-form-item label="Address" prop="address">
					<el-input v-model="query.address" />
				</el-form-item>
			</template>
			<template v-slot:column>
				<el-table-column prop="date" label="Date" />
				<el-table-column prop="name" label="Name" />
				<el-table-column prop="state" label="State" />
				<el-table-column prop="city" label="City" />
				<el-table-column prop="address" label="Address" />
				<el-table-column prop="zip" label="Zip" />
			</template>
			<template v-slot:form="form">
				<el-form-item label="Date" prop="date">
					<el-input v-model="form.date" />
				</el-form-item>
				<el-form-item label="Name" prop="name">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-form-item label="Address" prop="address">
					<el-input v-model="form.address" />
				</el-form-item>
			</template>
		</Crud>
	</div>
</template>

<script lang="ts" setup>
import Crud from '@/components/Crud/index.vue';
import { dictCrud } from '@/api/dict';

defineOptions({
	name: 'SystemDicts',
});
</script>

<style lang="less" scoped>
//
</style>
