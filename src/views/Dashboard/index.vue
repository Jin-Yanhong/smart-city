<template>
	<div class="view">
		<div class="box">
			<div class="one"><BarChart /></div>
			<div class="two"><LineChart /></div>
			<div class="three"><MixedChart /></div>
			<div class="four"><PieChart /></div>
		</div>
	</div>
</template>

<script lang="ts">
import BarChart from "@/components/Charts/BarChart.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import MixedChart from "@/components/Charts/MixedChart.vue";
import PieChart from "@/components/Charts/PieChart.vue";
import { defineComponent } from "vue";

export default defineComponent({
	name: "view_dashboard",
	components: {
		BarChart,
		LineChart,
		MixedChart,
		PieChart,
	},
	methods: {},
});
</script>
<style lang="less" scoped>
.box {
	display: grid;
	grid-template-rows: repeat(2, calc(50% - 5px));
	grid-template-columns: repeat(2, calc(50% - 5px));
	gap: 10px;
	height: 100%;
	background: #fff;
	.one {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 1;
		grid-column-end: 2;
		background: #0abde3;
	}
	.two {
		grid-row-start: 1;
		grid-row-end: 2;
		grid-column-start: 2;
		grid-column-end: 3;
		background: #54a0ff;
	}
	.three {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 1;
		grid-column-end: 2;
		background: #ee5253;
	}
	.four {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 2;
		grid-column-end: 3;
		background: #10ac84;
	}
}
</style>
