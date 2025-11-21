<template>
	<div class="h-dvh w-full">
		<div class="sticky top-0 h-16 w-full flex bg-black z-10">
			<a
				href="#/"
				class="grow basis-0 text-white px-4 py-2 decoration-none grid place-items-center"
				:class="{
					'border-b border-gray-500': currentPath !== '#/logs',
				}"
			>
				Calculator
			</a>
			<a
				href="#/logs"
				class="grow basis-0 text-white px-4 py-2 decoration-none grid place-items-center"
				:class="{
					'border-b border-gray-500': currentPath === '#/logs',
				}"
			>
				Logs
			</a>
		</div>
		<div class="overflow-y-auto py-5 px-8">
			<component :is="currentView" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";

import Calculator from "./components/Calculator.vue";
import Logs from "./components/Logs.vue";

const routes = {
	"/": Calculator,
	"/logs": Logs,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
	currentPath.value = window.location.hash;
});

const currentView = computed(() => {
	return routes[currentPath.value.slice(1) || "/"] || Calculator;
});
</script>
