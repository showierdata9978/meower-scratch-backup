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

<div class="post_wrapper" >
	<div class="post_topbar"> {data.time.posted} </div>
	<div class="post_body">
		<div class="post_sidebar">
			{data.username} <br>
			<img src="/pfps/{data.username}.png" alt="{data.username}'s pfp">
		</div>
		<div class="post-content" bind:this={wrapper}>
			{@html data.content.html}
		</div>
	</div>
</div>

<style>
	.post_wrapper {
		margin: 5px;
		padding: 0px;
		overflow: hidden;
		box-shadow: 0 2px 3px rgba(34,25,25,0.3);
		border-radius: 20px 20px 0px 0px;

		color: black;
	}

	.post_topbar {
		background-color: #855cd6;
		padding: 5px;
		border-radius: 20px 20px 0px 0px;
	}

	.post_sidebar img {
		margin: 5px;
		width: 200px;
	}

	.post_sidebar {
		width: 16em;
		background-color: #f7f7f7;
		margin: 0px;
		border-radius: 0px 0px 0px 0px;
		align-items: center;
		text-align: center;
		margin-bottom: -5000vh; /* any large number will do */
		padding-bottom: 5000vh;
	}

	.post-content {
		display: flex;
		flex-direction: column;

		float: left;
		padding: 5px;
		margin-left: 16em;
		margin-top: -15em;
	}

	:global(blockquote) {
		border-color: #1e1e1e !important;
		background-color: #f7f7f7;;
		border-width: 1px !important;
		border-style: solid !important;
		margin: 5px;
		padding: 2px;
	}

	:global(.bb-quote-author) {
		font-weight: bold;
		padding: 0px !important;
		padding-bottom: 6px !important;
		margin: 0px !important;
	}
</style>