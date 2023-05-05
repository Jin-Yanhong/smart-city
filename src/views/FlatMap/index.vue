<template>
	<div class="view">
		<div class="container">
			<!-- <MapOl @onMapReady="onMapReady">
				<div ref="overlayContainer" class="overlay">Hello, I'm here</div>
			</MapOl> -->
		</div>

		<div class="flex-between topBtnGroup">
			<div class="left">
				<ElButton size="small" type="primary">治安数据</ElButton>
				<ElButton size="small" type="primary">消防数据</ElButton>
				<ElButton size="small" type="primary">交通数据</ElButton>
				<ElButton size="small" type="primary">气象数据</ElButton>
				<ElButton size="small" type="primary">其他数据</ElButton>
			</div>

			<div class="center" ref="noticeContainer">
				<div class="notice" ref="notice">
					<ElTag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
						{{ item.label }}
					</ElTag>
				</div>
			</div>
			<div class="flex-end right">
				<ElButton type="" size="small" round> 当前任务 </ElButton>
				<ElButton type="primary" size="small" round> 共计 1024 </ElButton>
				<ElButton type="success" size="small" round> 已处理 329 </ElButton>
				<ElButton type="info" size="small" round> 需协助 103 </ElButton>
				<ElButton type="danger" size="small" round> 需上报 15 </ElButton>
			</div>
		</div>

		<div class="flex-between bottomInfoGroup">
			<div class="left">
				<ElButton size="small" type="success">当前连接数：3289</ElButton>
				<ElButton size="small" type="success">最大连接数：120472</ElButton>
				<ElButton size="small" type="success">连接状态良好</ElButton>
			</div>
			<div class="center">
				<ElButton size="small" type="success">呼叫其他成员</ElButton>
				<ElButton size="small" type="warning">一键呼叫指挥中心</ElButton>
			</div>
			<div class="right">
				<ElButton size="small" type="success">网络状态：良好</ElButton>
				<ElButton size="small" type="success">通讯是否就绪：已就绪</ElButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Map from "ol/Map";
import type { TagProps } from "element-plus";
import MapOl from "@/components/Map/index.vue";
import { overlayIns } from "@/components/Map/mapOperates";

type Item = { type: TagProps["type"]; label: string };

const mapIns = ref<Map>();
const overlayContainer = ref<HTMLDivElement>();
const items = ref<Array<Item>>([
	{ type: "danger", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！1" },
	{ type: "success", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！2" },
	{ type: "info", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！3" },
	{ type: "danger", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！4" },
	{ type: "warning", label: "纬七路 与 经二十六路 交汇处发生车辆交通事故，造成交通拥堵。请立即前往处理！5" },
]);

let myInterval = ref();
const notice = ref<HTMLDivElement>();
const noticeContainer = ref<HTMLDivElement>();

onMounted(() => {
	window.setTimeout(() => {
		setMymyInterval();
	}, 2000);
});

function msgTextParser(input: string): string {
	let result;
	const reg = /(?<=translateX\()[^\(\)]*(?=px\))/;

	if (reg.test(input)) {
		const arr = input.match(reg) || [""];
		result = arr[0];
	} else {
		result = "";
	}
	return result;
}

function setMymyInterval() {
	const scrollWidth = notice.value?.scrollWidth || 0;
	const containerWidth = noticeContainer.value?.clientWidth || 0;
	if (scrollWidth > containerWidth) {
		let offset = 0;
		myInterval.value = window.setInterval(() => {
			const input = notice.value?.style.transform || "";
			const noticeScroll = Number(msgTextParser(input));
			if (Math.abs(noticeScroll) <= scrollWidth - containerWidth) {
				offset += 1;
				notice.value?.setAttribute("style", `transform: translateX(-${offset}px);`);
			} else {
				window.setTimeout(() => {
					offset = 0;
					notice.value?.setAttribute("style", `transform: translateX(0px); transition: 1s;`);
				}, 1200);
			}
		}, 10);
	}
}
function clearMymyInterval() {
	window.clearInterval(myInterval.value);
}
onBeforeUnmount(() => {
	clearMymyInterval();
});

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
			width: 100%;
			overflow-x: auto;
			cursor: pointer;
			white-space: nowrap;

			.notice {
				height: 100%;
				display: table;
				overflow-x: auto;
				cursor: pointer;
				white-space: nowrap;

				& > .el-tag {
					transform: translateY(10px);
				}
			}
			&::-webkit-scrollbar {
				display: none;
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
