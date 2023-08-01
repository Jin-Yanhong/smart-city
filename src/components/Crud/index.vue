<script lang="jsx">
import { defineComponent, h, ref } from 'vue';
import { ElPagination, ElTable, ElTableColumn } from 'element-plus';

export default defineComponent({
	name: 'Crud',
	props: ['api'],
	setup(props, { attrs, slots, emit, expose }) {
		console.log(slots.default());
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
			{
				date: '2016-05-04',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
			{
				date: '2016-05-01',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
			},
		];

		return () =>
			h(
				'div',
				{ ...props },
				<div>
					<div class="marginT">
						<ElTable
							data={tableRowData}
							slots={{
								default: slots.default(),
							}}
						/>
					</div>

					<div class="marginT">
						<ElPagination small layout="prev, pager, next" total={30} />
					</div>
				</div>
			);
	},
});
</script>
