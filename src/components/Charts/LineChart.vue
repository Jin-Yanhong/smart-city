<template>
	<div class="BarChart" ref="LineChart"></div>
</template>

<script lang="ts">
import type { ECharts, EChartsOption } from "echarts";
import { graphic, init } from "echarts";
import { defineComponent, PropType, ref } from "vue";

function getOption() {
	return {
		title: {
			text: "2019年销售水量和主营业务收入对比",
			align: "center",
			color: "#fff",
			fontSize: 20,
			top: "3%",
			left: "10%",
		},
		backgroundColor: "#0f375f",
		grid: {
			top: "25%",
			bottom: "10%", // 也可设置left和right设置距离来控制图表的大小
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
				label: {
					show: true,
				},
			},
		},
		legend: {
			data: ["销售水量", "主营业务"],
			top: "15%",
			color: "#ffffff",
		},
		xAxis: {
			data: [
				"当年完成水量",
				"去年同期水量",
				"滚动目标值水量",
				"全年目标值水量",
				"当年完成金额",
				"去年同期金额",
				"滚动目标金额",
				"全年目标值",
			],
			axisLine: {
				show: true, // 隐藏X轴轴线
				lineStyle: {
					color: "#01FCE3",
				},
			},
			axisTick: {
				show: true, // 隐藏X轴刻度
			},
			axisLabel: {
				show: true,
				color: "#ebf8ac", // X轴文字颜色
			},
		},
		yAxis: [
			{
				type: "value",
				name: "亿元",
				nameTextStyle: {
					color: "#ebf8ac",
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: true,
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "#FFFFFF",
					},
				},
				axisLabel: {
					show: true,

					color: "#ebf8ac",
				},
			},
			{
				type: "value",
				name: "同比",
				nameTextStyle: {
					color: "#ebf8ac",
				},
				position: "right",
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					show: true,
					formatter: "{value} %", // 右侧Y轴文字显示

					color: "#ebf8ac",
				},
			},
			{
				type: "value",
				gridIndex: 0,
				min: 50,
				max: 100,
				splitNumber: 8,
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
					},
				},
			},
		],
		series: [
			{
				name: "销售水量",
				type: "line",
				yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
				smooth: true, // 平滑曲线显示
				showAllSymbol: true, // 显示所有图形。
				symbol: "circle", // 标记的图形为实心圆
				symbolSize: 10, // 标记的大小
				itemStyle: {
					// 折线拐点标志的样式
					color: "#058cff",
				},
				lineStyle: {
					color: "#058cff",
				},
				areaStyle: {
					color: "rgba(5,140,255, 0.2)",
				},
				data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
			},
			{
				name: "主营业务",
				type: "bar",
				barWidth: 15,
				itemStyle: {
					color: new graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "#00FFE3",
						},
						{
							offset: 1,
							color: "#4693EC",
						},
					]),
				},
				data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
			},
		],
	};
}
export default defineComponent({
	name: "LineChart",
	setup(props, ctx) {
		const LineChart = ref<HTMLDivElement>();
		const echartsIns: ECharts | any = null;
		return {
			LineChart,
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
			this.echartsIns = init(this.LineChart as HTMLElement);
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
