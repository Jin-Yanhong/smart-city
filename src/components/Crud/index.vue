<script lang="jsx">
import { h, nextTick } from 'vue';
import { ElButton, ElPagination, ElTable, ElTableColumn, ElIcon, ElDialog, ElForm, ElMessageBox } from 'element-plus';
import { Search, Delete as DelIcon, Edit, Plus, RefreshLeft } from '@element-plus/icons-vue';
import { formRules } from './setFormRules';
import { i18nTm } from '@/utils/index';
import { curdConst } from './constant';

const formStatus = {
	update: 'update',
	create: 'create',
};

const query = {
	size: 10,
	page: 1,
};
export default {
	name: 'Crud',
	render() {
		const { tableName, toCreate, toDelete, toUpdate, toQuery, toQueryReset, pageCurrentChange, pageSizeChange, toSubmit } = this;
		let { status, pager, dialogVisible, tableRowData } = this;

		const columns = this.$slots?.column();

		const columnsList = columns && columns instanceof Array ? columns : [];

		const columnSlots = columnsList.concat(
			<ElTableColumn label='操作'>
				{{
					default: ({ row, $index }) => (
						<div>
							<ElButton size='small' type='warning' icon={() => <ElIcon>{() => <Edit />}</ElIcon>} onClick={() => toUpdate(row, $index)}>
								{() => i18nTm('crudBtn.update')}
							</ElButton>
							<ElButton size='small' type='danger' icon={() => <ElIcon>{() => <DelIcon />}</ElIcon>} onClick={() => toDelete(row, $index)}>
								{() => i18nTm('crudBtn.delete')}
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
				<div class='flex-between'>
					<div>
						<ElForm ref='queryForm' class='queryForm' model={this.query} inline>
							{() => this.$slots.query(this.query)}
						</ElForm>
					</div>
					<div>
						<ElButton type='success' icon={() => <ElIcon>{() => <Plus />}</ElIcon>} onClick={toCreate}>
							{() => i18nTm('crudBtn.create')}
						</ElButton>
						<ElButton type='danger' icon={() => <ElIcon>{() => <DelIcon />}</ElIcon>} onClick={toDelete}>
							{() => i18nTm('crudBtn.delete')}
						</ElButton>
						<ElButton type='primary' icon={() => <ElIcon>{() => <Search />}</ElIcon>} onClick={toQuery}>
							{() => i18nTm('crudBtn.read')}
						</ElButton>
						<ElButton type='warning' icon={() => <ElIcon>{() => <RefreshLeft />}</ElIcon>} onClick={toQueryReset}>
							{() => i18nTm('crudBtn.reset')}
						</ElButton>
					</div>
				</div>

				<div class='hr' />

				<div class='marginT'>
					<ElTable ref='table' load={() => this.loading.table} data={tableRowData} border>
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
									{() => i18nTm('crudBtn.calcel')}
								</ElButton>
								<ElButton size='small' type='primary' loading={this.loading.btn} onClick={toSubmit}>
									{() => i18nTm('crudBtn.confirm')}
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
			tableRowData: [],
			query: query,
			pager: {
				size: 10,
				total: 0,
				current: 1,
			},
			dialogVisible: false,
			status: formStatus.create,
			currentItem: {},
			formRules: {},
			loading: {
				table: false,
				btn: false,
			},
		};
	},
	props: {
		tableName: {
			type: String,
			required: true,
			default: '',
		},
		crud: {
			type: Object,
			required: true,
			default: () => {},
		},
	},
	created() {
		this.setFormRules();
		this.toQuery();
	},
	methods: {
		/**
		 *
		 * @param { string } formName ElForm ref名称
		 * @param { Function } callback 回调函数
		 */
		async resetFormFields(formName, callback) {
			await nextTick(() => {
				this.$refs[formName].resetFields();

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
			this.resetFormFields('ruleForm', () => {
				this.status = formStatus.create;
			});
		},
		toDelete(row) {
			ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning',
			})
				.then(() => {
					this.crud.delete(row._id, res => {
						this.$message.success(curdConst.message.delete);
						this.toReload();
					});
				})
				.catch(() => {
					this.$message.info('Delete canceled');
				});
		},
		toUpdate(row) {
			this.dialogVisible = true;
			this.resetFormFields('ruleForm', () => {
				this.status = formStatus.update;
				this.currentItem = JSON.parse(JSON.stringify(row));
			});
		},
		toQuery() {
			this.query = query;
			this.toReload();
		},
		toQueryReset() {
			this.resetFormFields('queryForm', () => {
				this.toReload();
			});
		},
		toReload() {
			this.loading.table = true;
			this.crud.list(this.query, res => {
				this.loading.table = false;
				this.tableRowData = res.content;
				this.pager.total = res.total;
				this.pager.size = this.query.size;
				this.pager.current = this.query.page;
			});
		},
		pageCurrentChange(current) {
			this.query.page = current;
			this.toReload();
		},
		pageSizeChange(size) {
			this.query.size = size;
			this.toReload();
		},
		toSubmit() {
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					//
					if (this.status == formStatus.create) {
						this.crud.create(this.currentItem, res => {
							this.$message.success(curdConst.message.create);
							this.toReload();
							this.dialogVisible = false;
						});
						return;
					}

					if (this.status == formStatus.update) {
						this.crud.update(this.currentItem.id, this.currentItem, res => {
							this.$message.success(curdConst.message.update);
							this.toReload();
							this.dialogVisible = false;
						});
						return;
					}
				}
			});
		},
	},
};
</script>
