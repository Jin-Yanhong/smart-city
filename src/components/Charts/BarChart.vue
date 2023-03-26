<template>
	<div class="BarChart" ref="barChart"></div>
</template>

<script lang="ts">
import type { ECharts, EChartsOption } from "echarts";
import { graphic, init } from "echarts";
import { defineComponent, PropType, ref } from "vue";

function getOption() {
	return {
		backgroundColor: "#05224d",
		tooltip: {},
		grid: {
			top: "8%",
			left: "1%",
			right: "1%",
			bottom: "8%",
			containLabel: true,
		},
		legend: {
			itemGap: 50,
			data: ["注册总量", "最新注册量"],
			color: "#f9f9f9",
			borderColor: "#fff",
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: true,
				axisLine: {
					// 坐标轴轴线相关设置。数学上的x轴
					show: true,
					lineStyle: {
						color: "#f9f9f9",
					},
				},
				axisLabel: {
					// 坐标轴刻度标签的相关设置
					color: "#d1e6eb",
					margin: 15,
				},
				axisTick: {
					show: false,
				},
				data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
			},
		],
		yAxis: [
			{
				type: "value",
				min: 0,
				// max: 140,
				splitNumber: 7,
				splitLine: {
					show: true,
					lineStyle: {
						color: "#0a3256",
					},
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
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
				// smooth: true, //是否平滑曲线显示
				// symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
				showAllSymbol: true,
				symbol: "emptyCircle",
				symbolSize: 6,
				lineStyle: {
					color: "#28ffb3", // 线条颜色
					borderColor: "#f0f",
				},
				label: {
					show: true,
					position: "top",
					color: "#fff",
				},
				itemStyle: {
					color: "#28ffb3",
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
								color: "rgba(0,154,120,1)",
							},
							{
								offset: 1,
								color: "rgba(0,0,0, 0)",
							},
						],
						false
					),
					shadowColor: "rgba(53,142,215, 0.9)", // 阴影颜色
					shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
				},
				data: [393, 438, 485, 631, 689, 824, 987],
			},
			{
				name: "最新注册量",
				type: "bar",
				barWidth: 20,
				tooltip: {
					show: false,
				},
				label: {
					show: true,
					position: "top",
					color: "#fff",
				},
				itemStyle: {
					color: function (params: any) {
						const colorList = ["#0ec1ff", "#10cdff", "#12daff", "#15ebff", "#17f8ff", "#1cfffb", "#1dfff1"];
						return colorList[params.dataIndex];
					},
				},
				data: [200, 382, 102, 267, 186, 315, 316],
			},
		],
	};
}
export default defineComponent({
	name: "Bar_Chart",
	setup(props, ctx) {
		const barChart = ref<HTMLDivElement>();
		const echartsIns: ECharts | any = null;
		return {
			barChart,
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
			this.echartsIns = init(this.barChart as HTMLElement);
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
