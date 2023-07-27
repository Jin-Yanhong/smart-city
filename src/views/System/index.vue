<template>
	<div class="view">
		国际化
		<div class="hr"></div>
		{{ $t('message.hello', { msg: 'hello,' }) }}
		<el-calendar v-model="value" />
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from '@vue/runtime-core';

import useAppStore from '@/store/app';
const AppStore = useAppStore();

const value = ref<Date>();
const local = computed(() => AppStore.getLocale);

onMounted(() => {});
</script>

<style></style>
