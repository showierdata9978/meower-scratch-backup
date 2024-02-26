<script lang="ts">
	import type { ScratchDump } from './lib/types';
  import svelteLogo from './assets/svelte.svg'
  import Dump from "./assets/dump.json"
	import Post from './lib/Post.svelte';
	import Navigation from './lib/Navigation.svelte';
	import { writable } from 'svelte/store';
  import { page } from './lib/stores';

  const dump: ScratchDump = Dump as unknown as ScratchDump; // Cursed XD

  const page_count = 25;
  const max_pages = Math.floor(dump.length / page_count)

  page.subscribe((value) => {
    window.scrollTo(0, 0);
  })
</script>

<Navigation {max_pages} />

{#each dump.slice(page_count * $page, (page_count * $page + page_count)) as page_data}
  <Post data={page_data} />
{/each}

<Navigation {max_pages} />
