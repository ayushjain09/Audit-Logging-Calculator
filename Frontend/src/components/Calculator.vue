<template>
	<div class="h-dvh w-full grid place-items-center">
		<div class="bg-blue-50 rounded-xl p-4 flex flex-col gap-4 shrink-0">
			<div
				class="w-full h-28 flex items-center justify-end bg-blue-200 rounded-xl text-black overflow-x-hidden overflow-y-auto text-2xl py-3 px-4"
			>
				<p>{{ displayString }}</p>
			</div>

			<div class="flex items-stretch gap-4">
				<div class="grid grid-cols-4 grid-rows-4 gap-x-4 gap-y-4">
					<button
						v-for="button in BUTTONS"
						:key="button.label"
						class="bg-gray-200 grid place-items-center h-20 w-20 text-2xl font-black text-black rounded-2xl cursor-pointer active:scale-95 transition-all"
						@click="handleClickInput(button)"
					>
						{{ button.label }}
					</button>
				</div>
				<div class="flex flex-col gap-4">
					<div
						class="bg-gray-200 grid place-items-center grow w-20 text-2xl font-black text-black rounded-2xl"
					></div>
					<button
						class="bg-gray-200 grid place-items-center h-20 w-20 text-2xl font-black text-black rounded-2xl cursor-pointer active:scale-95 transition-all"
						@click="displayString = ''"
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";

// Buttons with their associated type and audit action
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

// Keymap for keyboard input
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

// String to be displayed, stores the input and evaluated result
const displayString = ref("");

const handleClickInput = async (button) => {
	logEvent(button);

	if (button.label === "=") {
		displayString.value = calculate(displayString.value);
		return;
	}

	displayString.value += button.label;
};

const handleKeyInput = (event) => {
	event.preventDefault();
	const key = event.key;

	if (key === "Backspace") {
		displayString.value = displayString.value.slice(0, -1);
		return;
	}

	const buttonLabel = KEYMAP[key];
	const button = BUTTONS.find((b) => String(b.label) === buttonLabel);
	if (!button) return;

	logEvent(button);

	if (key === "Enter" || key === "=") {
		displayString.value = calculate(displayString.value);
		return;
	}

	displayString.value += button.label;
};

// Post the event to be logged to the backend
const logEvent = async (button) => {
	try {
		await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logs`, {
			action: button.action,
			value: button.type === "equals" ? "equals" : String(button.label),
		});
	} catch (error) {
		console.log("Failed to log action: ", error);
	}
};

const calculate = (expr) => {
	try {
		return Function(`return ${expr}`)();
	} catch (e) {
		return "Error";
	}
};

onMounted(() => {
	window.addEventListener("keydown", handleKeyInput);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyInput);
});
</script>
