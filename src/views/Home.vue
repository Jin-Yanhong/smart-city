<template>
	<ElButton type="primary" @click="AppStore.switchTheme()"> Click me! {{ theme }} </ElButton>
</template>

<script lang="ts" setup>
import { computed } from "@vue/runtime-core";
import useAppStore from "@/store/app";

const AppStore = useAppStore();

const theme = computed(() => AppStore.getTheme);
</script>

<style lang="less"></style>
