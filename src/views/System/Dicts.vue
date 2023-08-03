<template>
	<div class="view">
		<Crud tableName="字典项" :crud="dictCrud">
			<template v-slot:query="query">
				<el-form-item label="desc" prop="desc">
					<el-input v-model="query.desc" />
				</el-form-item>
				<el-form-item label="index" prop="index">
					<el-input v-model="query.index" />
				</el-form-item>
				<el-form-item label="key" prop="key">
					<el-input v-model="query.key" />
				</el-form-item>
			</template>
			<template v-slot:column>
				<el-table-column prop="_id" label="ID" showOverflowTooltip />
				<el-table-column prop="desc" label="Desc" />
				<el-table-column prop="index" label="Index" />
				<el-table-column prop="key" label="Key" />
				<el-table-column prop="label" label="Label" />
			</template>
			<template v-slot:form="form">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="desc" prop="desc">
							<el-input v-model="form.desc" />
						</el-form-item>
						<el-form-item label="key" prop="key">
							<el-input v-model="form.key" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="index" prop="index">
							<el-input v-model="form.index" />
						</el-form-item>
						<el-form-item label="label" prop="label">
							<el-input v-model="form.label" />
						</el-form-item>
					</el-col>
				</el-row>
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
