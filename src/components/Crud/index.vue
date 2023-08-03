<script lang="jsx">
import { h, nextTick } from 'vue';
import { ElButton, ElPagination, ElTable, ElTableColumn, ElIcon, ElDialog, ElForm } from 'element-plus';
import { Search, Delete, Edit, Plus } from '@element-plus/icons-vue';
import { formRules } from './setFormRules';

const formStatus = {
	update: 'update',
	create: 'create',
};

export default {
	name: 'Crud',
	render() {
		const { tableName, toCreate, toDelete, toUpdate, toQuery, pageCurrentChange, pageSizeChange, toSubmit } = this;
		let { status, pager, dialogVisible, tableRowData } = this;

		const columns = this.$slots?.column();

		const columnsList = columns && columns instanceof Array ? columns : [];

		const columnSlots = columnsList.concat(
			<ElTableColumn label='操作'>
				{{
					default: ({ row, $index }) => (
						<div>
							<ElButton size='small' type='warning' icon={() => <ElIcon>{() => <Edit />}</ElIcon>} onClick={() => toUpdate(row, $index)}>
								{() => '更新'}
							</ElButton>
							<ElButton size='small' type='danger' icon={() => <ElIcon>{() => <Delete />}</ElIcon>} onClick={() => toDelete(row, $index)}>
								{() => '删除'}
							</ElButton>
						</div>
					),
				}}
			</ElTableColumn>
		);

		return h(
			'div',
			{ class: ['Crud'] },
			<div>
				<div>
					<ElButton type='success' icon={() => <ElIcon>{() => <Plus />}</ElIcon>} onClick={toCreate}>
						{() => '新增'}
					</ElButton>
					<ElButton type='danger' icon={() => <ElIcon>{() => <Delete />}</ElIcon>} onClick={toDelete}>
						{() => '删除'}
					</ElButton>
					<ElButton type='warning' icon={() => <ElIcon>{() => <Edit />}</ElIcon>} onClick={toUpdate}>
						{() => '更新'}
					</ElButton>
					<ElButton type='primary' icon={() => <ElIcon>{() => <Search />}</ElIcon>} onClick={toQuery}>
						{() => '查询'}
					</ElButton>
				</div>

				<div class='marginT'>
					<ElTable ref='table' data={tableRowData} border>
						{() => columnSlots}
					</ElTable>
				</div>

				<div class='marginT flex'>
					<span style='flex: 1' />
					<ElPagination small background layout='total, sizes, prev, pager, next, jumper' pageSize={pager.size} currentPage={pager.current} total={pager.total} onUpdate:current-page={pageCurrentChange} onUpdate:page-size={pageSizeChange} />
				</div>

				<ElDialog
					appendToBody
					title={(status == formStatus.create ? '新增' : '编辑') + ' ' + tableName}
					modelValue={dialogVisible}
					onUpdate:modelValue={$event => {
						this.dialogVisible = $event;
					}}
				>
					{{
						default: () => (
							<ElForm ref='ruleForm' model={this.currentItem} rules={this.formRules}>
								{() => this.$slots.form(this.currentItem)}
							</ElForm>
						),
						footer: () => (
							<span>
								<ElButton size='small' type='' onClick={() => (this.dialogVisible = false)}>
									{() => '取消'}
								</ElButton>
								<ElButton size='small' type='primary' onClick={toSubmit}>
									{() => '确认'}
								</ElButton>
							</span>
						),
					}}
				</ElDialog>
			</div>
		);
	},
	data() {
		return {
			tableRowData: [
				{
					date: '2016-05-03',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
					tag: 'Home',
				},
				{
					date: '2016-05-04',
					name: 'Tom',
					state: 'California',
					city: 'Los Angeles',
					address: 'No. 189, Grove St, Los Angeles',
					zip: 'CA 90036',
					tag: 'Home',
				},
			],
			query: {},
			pager: {
				size: 10,
				total: 100,
				current: 1,
			},
			dialogVisible: false,
			status: formStatus.create,
			currentItem: {},
			formRules: {},
		};
	},
	props: {
		tableName: {
			type: String,
			required: true,
			default: '',
		},
	},
	created() {
		this.setFormRules();
	},
	methods: {
		async resetFormFields(callback) {
			await nextTick(() => {
				this.$refs.ruleForm.resetFields();

				for (const key in this.currentItem) {
					if (Object.hasOwnProperty.call(this.currentItem, key)) {
						this.currentItem[key] = undefined;
					}
				}
			})
				.then(() => {
					callback();
				})
				.catch(err => {
					console.log('Crud resetFormFields Error:', err.message);
				});
		},
		setFormRules() {
			const columns = this.$slots?.column();
			const columnsList = columns && columns instanceof Array ? columns : [];
			columnsList.forEach(column => (this.currentItem[column.props.prop] = undefined));
			this.formRules = formRules(this.currentItem);
		},
		toCreate() {
			this.dialogVisible = true;
			this.resetFormFields(() => {
				this.status = formStatus.create;
			});
		},
		toDelete(row) {},
		toUpdate(row) {
			this.dialogVisible = true;
			this.resetFormFields(() => {
				this.status = formStatus.update;
				this.currentItem = JSON.parse(JSON.stringify(row));
			});
		},
		toQuery() {},
		toReload() {},
		pageCurrentChange() {},
		pageSizeChange() {},
		toSubmit() {},
	},
};
</script>
