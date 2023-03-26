<template>
	<div class="BarChart" ref="PieChart"></div>
</template>

<script lang="ts">
import type { ECharts, EChartsOption } from "echarts";
import { init } from "echarts";
import { defineComponent, PropType, ref } from "vue";

function getOption() {
	return {
		backgroundColor: "#2c343c",
		title: {
			text: "南丁格尔玫瑰图",
			left: "center",
			top: 20,
			color: "#ccc",
		},

		tooltip: {
			trigger: "item",
			formatter: "{b} : {c} ({d}%)",
		},

		visualMap: {
			show: false,
			min: 500,
			max: 600,
			inRange: {
				// colorLightness: [0, 1]
			},
		},
		series: [
			{
				name: "访问来源",
				type: "pie",
				radius: "50%",
				center: ["50%", "50%"],
				color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], // '#FBFE27','rgb(11,228,96)','#FE5050'
				data: [
					{
						value: 285,
						name: "黑名单查询",
					},
					{
						value: 410,
						name: "红名单查询",
					},
					{
						value: 274,
						name: "法人行政处罚",
					},
					{
						value: 235,
						name: "其它查询",
					},
				].sort(function (a, b) {
					return a.value - b.value;
				}),
				roseType: "radius",

				label: {
					formatter: ["{c|{c}次}", "{b|{b}}"].join("\n"),
					rich: {
						c: {
							color: "rgb(241,246,104)",
							fontSize: 20,
							fontWeight: "bold",
							lineHeight: 5,
						},
						b: {
							color: "rgb(98,137,169)",
							fontSize: 15,
							height: 40,
						},
					},
				},
				labelLine: {
					lineStyle: {
						color: "rgb(98,137,169)",
					},
					smooth: 0.2,
					length: 10,
					length2: 20,
				},
				itemStyle: {
					shadowColor: "rgba(0, 0, 0, 0.8)",
					shadowBlur: 50,
				},
			},
		],
	};
}
export default defineComponent({
	name: "PieChart",
	setup(props, ctx) {
		const PieChart = ref<HTMLDivElement>();
		const echartsIns: ECharts | any = null;
		return {
			PieChart,
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
			this.echartsIns = init(this.PieChart as HTMLElement);
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
