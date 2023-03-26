<template>
	<div class="view">
		<div>
			<p>use State by pinia</p>
			<ElButton type="primary" @click="AppStore.switchTheme()"> Click me! {{ theme }} </ElButton>
		</div>
		<div>
			<p>use http request</p>
			<ElImage v-for="img in data.imageList" :key="img" :src="img" style="width: 200px" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import useAppStore from "@/store/app";
import { loadImage } from "@/api/home";

const AppStore = useAppStore();

const data = reactive({
	imageList: [],
});

const theme = computed(() => AppStore.getTheme);

onMounted(() => {
	loadImage(res => {
		data.imageList = res.data;
	});
});
</script>

<style lang="less"></style>
