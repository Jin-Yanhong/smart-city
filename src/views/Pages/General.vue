<template>
	<div class="view">
		<h1>主要技术栈（不定时更新）</h1>
		<div v-for="(item, index) in desc" :key="index">
			<h2>{{ index + 1 }}、{{ item.title }}</h2>
			<div class="hr"></div>
			<ul class="list">
				<li v-for="(content, idx) in item.list" :key="idx">{{ index + 1 }}.{{ idx + 1 }} &nbsp;&nbsp;{{ content }}</li>
			</ul>
			<div class="hr"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
defineOptions({
	name: 'PagesGeneral',
});
const desc = reactive([
	{
		title: '系统管理',
		list: ['webSocket 服务端消息推送', 'D3 数据图表', '图表模块互动'],
	},
	{
		title: '平面地图',
		list: ['Openlayers 地图引擎', '区域规划、选取', '地图贴图、热点标注'],
	},
	{
		title: '三维地图',
		list: ['Cesium 三维地图引擎', '模型应用', '图表模块互动', '灾害预警'],
	},
	{
		title: '系统管理',
		list: ['threejs webgl 引擎', '模型应用', '告警信息推送', '灾害预警'],
	},
]);
</script>
<style lang="less">
h2 {
	text-indent: 0.5em;
}

.list {
	li {
		text-indent: 2em;
		line-height: 30px;
	}
}
</style>
