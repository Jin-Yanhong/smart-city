<script lang="jsx">
import { h } from 'vue';
import { ElButton, ElPagination, ElTable, ElTableColumn, ElIcon } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

export default {
	name: 'Crud',
	props: ['api'],
	render() {
		const tableRowData = [
			{
				date: '2016-05-03',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
			{
				date: '2016-05-02',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
		];
		const defaultSlot = this.$slots.default().map(column => {
			return column;
		});

		const { toCreate, toDelete, toUpdate, toQuery } = this;

		return h(
			'div',
			{ class: ['Crud'] },
			<div>
				<div>
					<div class='marginT'>
						<ElButton size='small' type='' onClick={toCreate}>
							{{ default: () => '新增' }}
						</ElButton>
						<ElButton type='danger' onClick={toDelete}>
							{{ default: () => '删除' }}
						</ElButton>
						<ElButton type='' onClick={toUpdate}>
							{{ default: () => '更新' }}
						</ElButton>
						<ElButton type='danger' icon={{ default: () => <Search /> }} onClick={toQuery}>
							{{ default: () => '查询' }}
						</ElButton>
					</div>

					<div class='marginT'>
						<ElTable ref='table' data={tableRowData}>
							{{
								default: defaultSlot,
							}}

							<ElTableColumn>
								<ElButton type='' onClick={toUpdate}>
									{{ default: () => '修改' }}
								</ElButton>
								<ElButton type='' onClick={toUpdate}>
									{{ default: () => '删除' }}
								</ElButton>
							</ElTableColumn>
						</ElTable>
					</div>
				</div>
				<div class='marginT'>
					<ElPagination small layout='prev, pager, next' total={30} />
				</div>
			</div>
		);
	},
	data() {
		return {
			//
		};
	},
	methods: {
		toCreate() {},
		toDelete() {},
		toUpdate() {},
		toQuery() {},
	},
};
</script>
