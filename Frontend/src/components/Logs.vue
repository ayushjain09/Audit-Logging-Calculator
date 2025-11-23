<template>
	<div class="flex flex-col p-4 gap-5">
		<h1 class="text-xl font-black underline underline-offset-4">Logs</h1>
		<pre class="mt-2">{{ logs }}</pre>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const logs = ref([]);

onMounted(async () => {
	// Fetch logs from backend
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_BASE_URL}/logs`
		);
		logs.value = response.data.data;
	} catch (error) {
		console.error("Failed to fetch logs:", error);
	}
});
</script>
