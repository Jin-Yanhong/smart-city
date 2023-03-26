<template>
	<div class="appMain">
		<!-- <keep-alive> -->
		<router-view />
		<!-- </keep-alive> -->
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "App_Main",
});
</script>
