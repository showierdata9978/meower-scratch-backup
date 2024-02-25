<script lang="ts">
	import type { ScratchPost } from "./types";
	import MainCss from "../assets/main.css?raw";
	import StyleCss from "../assets/style.css?raw";
	import { onMount } from "svelte";


	export let data: ScratchPost;

	let wrapper: HTMLDivElement;

	onMount(() => {
		wrapper.style.cssText = MainCss + StyleCss;
	});
</script>

<div class="post_wrapper" bind:this={wrapper}>
	{data.username} Sent:
	{@html data.content.html}
</div>

<style>
	.post_wrapper {
		border: 5px solid white;
		border-radius: 20px;
		padding: 5px;
		margin: 5px;
	}
	:global(blockquote::before) {
	  content: '';
	  width: 0;
	  height: 100%;
	  position: static;
	  border: 1px solid white;
	  top: 0;
	  left: 5px;
	}
</style>