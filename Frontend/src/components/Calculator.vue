<template>
	<div class="h-dvh w-full grid place-items-center">
		<div class="bg-blue-50 rounded-xl p-4 flex flex-col gap-4 shrink-0">
			<div
				class="w-full h-28 flex items-center justify-end bg-blue-200 rounded-xl text-black overflow-x-hidden overflow-y-auto text-2xl py-3 px-4"
			>
				<p class="">{{ inputStr }}</p>
			</div>

			<div class="grid grid-cols-4 grid-rows-4 gap-x-4 gap-y-4">
				<button
					v-for="button in BUTTONS"
					:key="button.label"
					class="bg-gray-200 grid place-items-center h-20 w-20 text-2xl font-black text-black rounded-2xl cursor-pointer active:scale-95 transition-all"
					@click="handleInput(button)"
				>
					{{ button.label }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

const BUTTONS = [
	{
		label: 7,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 8,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 9,
		type: "number",
		action: "numberEntered",
	},
	{
		label: "+",
		type: "operator",
		action: "operatorEntered",
	},

	{
		label: 4,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 5,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 6,
		type: "number",
		action: "numberEntered",
	},
	{
		label: "-",
		type: "operator",
		action: "operatorEntered",
	},

	{
		label: 1,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 2,
		type: "number",
		action: "numberEntered",
	},
	{
		label: 3,
		type: "number",
		action: "numberEntered",
	},
	{
		label: "*",
		type: "operator",
		action: "operatorEntered",
	},

	{
		label: 0,
		type: "number",
		action: "numberEntered",
	},
	{
		label: ".",
		type: "number",
		action: "numberEntered",
	},
	{
		label: "=",
		type: "equals",
		action: "equalsPressed",
	},
	{
		label: "/",
		type: "operator",
		action: "operatorEntered",
	},
];

const KEYMAP = {
	0: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	".": ".",
	"+": "+",
	"-": "-",
	"*": "*",
	"/": "/",
	"=": "=",
	Enter: "=",
	Backspace: "Backspace",
};

const inputStr = ref("");

const handleKeyDown = (event) => {
	const key = event.key;

	if (key === "Backspace") {
		inputStr.value = inputStr.value.slice(0, -1);
		return;
	}

	if (key in KEYMAP) {
		event.preventDefault();
		const buttonLabel = KEYMAP[key];
		const button = BUTTONS.find((b) => String(b.label) === buttonLabel);
		if (button) handleInput(button);
	}
};

const handleInput = async (button) => {
	inputStr.value += button.label;

	// Post the event to the backend
	try {
		await axios.post("http://localhost:8000/logs", [
			{
				action: button.action,
				value:
					button.type === "equals" ? "equals" : String(button.label),
			},
		]);
	} catch (error) {
		console.log("Failed to log action: ", error);
	}
};

onMounted(() => {
	window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyDown);
});
</script>
