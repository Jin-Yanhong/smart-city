<template>
	<div class="BarChart" ref="MixedChart"></div>
</template>

<script lang="ts">
import type { ECharts, EChartsOption } from "echarts";
import { graphic, init } from "echarts";
import { defineComponent, PropType, ref } from "vue";

function getOption() {
	return {
		backgroundColor: "#080b30",
		title: {
			text: "多线图",

			align: "center",
			color: "#fff",
			fontSize: 20,

			top: "5%",
			left: "center",
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				lineStyle: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "rgba(0, 255, 233,0)",
							},
							{
								offset: 0.5,
								color: "rgba(255, 255, 255,1)",
							},
							{
								offset: 1,
								color: "rgba(0, 255, 233,0)",
							},
						],
						global: false,
					},
				},
			},
		},
		grid: {
			top: "15%",
			left: "5%",
			right: "5%",
			bottom: "15%",
			// containLabel: true
		},
		xAxis: [
			{
				type: "category",
				axisLine: {
					show: true,
				},
				splitArea: {
					// show: true,
					color: "#f00",
					lineStyle: {
						color: "#f00",
					},
				},
				axisLabel: {
					color: "#fff",
				},
				splitLine: {
					show: false,
				},
				boundaryGap: false,
				data: ["A", "B", "C", "D", "E", "F"],
			},
		],

		yAxis: [
			{
				type: "value",
				min: 0,
				// max: 140,
				splitNumber: 4,
				splitLine: {
					show: true,
					lineStyle: {
						color: "rgba(255,255,255,0.1)",
					},
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: false,
					margin: 20,

					color: "#d1e6eb",
				},
				axisTick: {
					show: false,
				},
			},
		],
		series: [
			{
				name: "注册总量",
				type: "line",
				smooth: true, // 是否平滑
				showAllSymbol: true,
				// symbol: 'image://./static/images/guang-circle.png',
				symbol: "circle",
				symbolSize: 15,
				lineStyle: {
					color: "#00b3f4",
					shadowColor: "rgba(0, 0, 0, .3)",
					shadowBlur: 0,
					shadowOffsetY: 5,
					shadowOffsetX: 5,
				},
				label: {
					show: true,
					position: "top",
					color: "#00b3f4",
				},
				itemStyle: {
					color: "#00b3f4",
					borderColor: "#fff",
					borderWidth: 3,
					shadowColor: "rgba(0, 0, 0, .3)",
					shadowBlur: 0,
					shadowOffsetY: 2,
					shadowOffsetX: 2,
				},
				tooltip: {
					show: false,
				},
				areaStyle: {
					color: new graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: "rgba(0,179,244,0.3)",
							},
							{
								offset: 1,
								color: "rgba(0,179,244,0)",
							},
						],
						false
					),
					shadowColor: "rgba(0,179,244, 0.9)",
					shadowBlur: 20,
				},
				data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
			},
			{
				name: "注册总量",
				type: "line",
				smooth: true, // 是否平滑
				showAllSymbol: true,
				// symbol: 'image://./static/images/guang-circle.png',
				symbol: "circle",
				symbolSize: 15,
				lineStyle: {
					color: "#00ca95",
					shadowColor: "rgba(0, 0, 0, .3)",
					shadowBlur: 0,
					shadowOffsetY: 5,
					shadowOffsetX: 5,
				},
				label: {
					show: true,
					position: "top",
					color: "#00ca95",
				},

				itemStyle: {
					color: "#00ca95",
					borderColor: "#fff",
					borderWidth: 3,
					shadowColor: "rgba(0, 0, 0, .3)",
					shadowBlur: 0,
					shadowOffsetY: 2,
					shadowOffsetX: 2,
				},
				tooltip: {
					show: false,
				},
				areaStyle: {
					color: new graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: "rgba(0,202,149,0.3)",
							},
							{
								offset: 1,
								color: "rgba(0,202,149,0)",
							},
						],
						false
					),
					shadowColor: "rgba(0,202,149, 0.9)",
					shadowBlur: 20,
				},
				data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
			},
		],
	};
}
export default defineComponent({
	name: "MixedChart",
	setup(props, ctx) {
		const MixedChart = ref<HTMLDivElement>();
		const echartsIns: ECharts | any = null;
		return {
			MixedChart,
			echartsIns,
		};
	},
	props: {
		option: {
			type: Object as PropType<EChartsOption>,
			default: () => {},
		},
	},
	watch: {
		option: function (nVal) {
			this.echartsIns.setOption(nVal);
		},
	},
	mounted() {
		this.initChart();
		const _this = this;
		window.addEventListener("resize", function () {
			_this.echartsIns.resize();
		});
	},
	beforeUnmount() {
		const _this = this;
		window.removeEventListener("resize", function () {
			_this.echartsIns.dispose();
		});
	},
	methods: {
		initChart() {
			this.echartsIns = init(this.MixedChart as HTMLElement);
			// TODO: 替换数据
			this.echartsIns.setOption(getOption());
			this.$emit("onChartInited", this.echartsIns);
		},
	},
});
</script>
<style lang="less" scoped>
.BarChart {
	width: 100%;
	height: 100%;
	min-width: 300px;
	min-height: 200px;
}
</style>
