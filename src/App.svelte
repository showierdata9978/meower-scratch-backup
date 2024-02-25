<script lang="ts">
	import type { ScratchDump } from './lib/types.ts';
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Dump from "./assets/dump.json"
	import Post from './lib/Post.svelte';

  const dump: ScratchDump = Dump as unknown as ScratchDump; // Cursed XD

  let page = 0;
  const page_count = 25;
  const max_pages = Math.floor(dump.length -1 / page_count)

</script>

{#if page != 0}
<button on:click|preventDefault={() => {
  page = 0
}}>
  &lt;&lt;
</button>
<button on:click|preventDefault={() => {
   page = page - 1;
}}

>-1</button>
{/if}
<input type="number" bind:value={page}>

<button on:click|preventDefault={() => {
  page = page + 1;
}}
>+1</button>

<button on:click|preventDefault={() => {
  page = max_pages
}}>
  &gt;&gt;
</button>


{#each dump.slice(page_count * page, (page_count * page + page_count)) as page_data}
  <Post data={page_data} />
{/each}