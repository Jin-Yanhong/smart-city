<template>
	<div class="view">
		<div class="hr"></div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from '@vue/runtime-core';
import useAppStore from '@/store/app';
// import useUserStore from '@/store/user';
const AppStore = useAppStore();
// const UserStore = useUserStore();

const local = computed(() => AppStore.getLocale);
// const local = computed(() => UserStore.token);
</script>

<style lang="less"></style>
