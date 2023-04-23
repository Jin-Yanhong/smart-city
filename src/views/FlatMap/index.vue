<template>
	<div class="view">
		<div class="container">
			<MapOl @onMapReady="onMapReady">
				<div ref="overlayContainer" class="overlay">Hello, I'm here</div>
			</MapOl>
		</div>

		<div class="flex-between topBtnGroup">
			<div class="left">
				<el-button size="small" type="primary">治安数据</el-button>
				<el-button size="small" type="primary">消防数据</el-button>
				<el-button size="small" type="primary">交通数据</el-button>
				<el-button size="small" type="primary">气象数据</el-button>
				<el-button size="small" type="primary">其他数据</el-button>
			</div>

			<div class="flex-center center">
				<el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
					{{ item.label }}
				</el-tag>
			</div>
			<div class="flex-end right">
				<el-button type="" size="small" round> 当前任务 </el-button>
				<el-button type="primary" size="small" round> 共计 1024 </el-button>
				<el-button type="success" size="small" round> 已处理 329 </el-button>
				<el-button type="info" size="small" round> 需协助 103 </el-button>
				<el-button type="danger" size="small" round> 需上报 15 </el-button>
			</div>
		</div>

		<div class="flex-between bottomInfoGroup">
			<div class="left">
				<el-button size="small" type="success">当前连接数：3289</el-button>
				<el-button size="small" type="success">最大连接数：120472</el-button>
				<el-button size="small" type="success">连接状态良好</el-button>
			</div>
			<div class="center">
				<el-button size="small" type="success">呼叫其他成员</el-button>
				<el-button size="small" type="warning">一键呼叫指挥中心</el-button>
			</div>
			<div class="right">
				<el-button size="small" type="success">网络状态：良好</el-button>
				<el-button size="small" type="success">通讯是否就绪：已就绪</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Map from "ol/Map";
import type { TagProps } from "element-plus";
import MapOl from "@/components/Map/index.vue";
import { overlayIns } from "@/components/Map/mapOperates";

type Item = { type: TagProps["type"]; label: string };

const mapIns = ref<Map>();
const overlayContainer = ref<HTMLDivElement>();
const items = ref<Array<Item>>([
	{ type: "danger", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！" },
	// { type: "success", label: "Tag 2" },
	// { type: "info", label: "Tag 3" },
	// { type: "danger", label: "Tag 4" },
	// { type: "warning", label: "Tag 5" },
]);

const onMapReady = (Ins: Map) => {
	mapIns.value = Ins;
	const overlay = overlayIns(1, overlayContainer.value as HTMLDivElement);
	mapIns.value.addOverlay(overlay);
	mapIns.value?.on("click", function (e) {
		overlay.setPosition(e.coordinate);
	});
};
</script>
<script lang="ts">
export default {
	name: "FlatMap",
};
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";

.view {
	position: relative;
	.container {
		position: absolute;
		top: @layout-gap;
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		.overlay {
			background: #fff;
			color: #333;
			border-radius: 4px;
			padding: @layout-gap;
			border: 1px solid @color-active;
			position: relative;

			&::before {
				content: "";
				width: 20px;
				height: 20px;
				border: 1px solid @color-active;
				display: block;
				position: absolute;
				bottom: -12px;
				background: #fff;
				left: calc(50% - 10px);
				transform: rotateZ(45deg);
				z-index: -2;
			}
			&::after {
				content: "";
				width: 30px;
				height: 2px;
				display: block;
				position: absolute;
				bottom: -1px;
				background: #fff;
				left: calc(50% - 14px);
				z-index: 1;
			}
		}
	}

	.topBtnGroup {
		background: #f6e58d;
		padding: 0 @layout-gap;
		position: relative;
		z-index: 1;
		height: calc(@layout-gap * 2 + 24px);
		& > div {
			flex: 1;
		}

		.center {
			height: 100%;
			flex-wrap: wrap;
			overflow-y: hidden;
			& > span {
				line-height: 24px;
				display: block;
				text-align: center;
				width: 100%;
				flex-grow: 1;
			}
		}
	}

	.bottomInfoGroup {
		background: #c8d6e5;
		padding: 0 @layout-gap;
		position: absolute;
		z-index: 1;
		width: calc(100% - 40px);
		height: calc(@layout-gap * 2 + 24px);
		bottom: @layout-gap;
	}
}
</style>
