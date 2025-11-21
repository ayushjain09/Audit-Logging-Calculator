<template>
	<div class="flex flex-col items-center">
		<h1 class="text-xl">Logs Page</h1>
		<pre>{{ logs }}</pre>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const logs = ref([]);

onMounted(async () => {
	// Fetch logs from backend
	try {
		const response = await axios.get("http://localhost:8000/logs");
		logs.value = response.data;
	} catch (error) {
		console.error("Failed to fetch logs:", error);
	}
});
</script>
