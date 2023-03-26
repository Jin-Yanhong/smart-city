<template>
	{{ props.msg }}
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
	msg: String,
});
</script>

<style lang="less"></style>
