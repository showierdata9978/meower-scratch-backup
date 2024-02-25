<script lang="ts">
  import { page } from "./stores"

	export let max_pages = 0;

  function checkPage() {
    if ($page < 0) {
      $page = 0;
    } else if ($page > max_pages) {
      $page = max_pages;
    }
  }


</script>

<div class="wrapper">
<button disabled={$page===0} on:click|preventDefault={() => {
  $page = 0
}}>
  &lt;&lt;
</button>
<button disabled={$page===0} on:click|preventDefault={() => {
   $page = $page - 1;
}}

>-1</button>

<input type="number" min="0" max={max_pages} bind:value={$page} on:input={checkPage}>

<button disabled={$page===max_pages} on:click|preventDefault={() => {
  $page = $page + 1;
}}
>+1</button>

<button disabled={$page===max_pages} on:click|preventDefault={() => {
  $page = max_pages
}}>
  &gt;&gt;
</button>
</div>

<style>

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin: 1em;
}

input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

button:disabled {
  background-color: darkgrey;
}

</style>