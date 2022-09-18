<script lang="ts">
	import { readableLocalStorage, writableLocalStorage } from '$lib/stores/storage';
	const writableStore = writableLocalStorage('my-store', '');
	const readableStore = readableLocalStorage('my-store');
</script>

<main>
	<section>
		<h2>writableLocalStorage</h2>
		<input type="text" bind:value={$writableStore} />
	</section>
	<section>
		<h2>readableLocalStorage</h2>
		<div>{$readableStore}</div>
	</section>
</main>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
	}
	main {
		height: 100vh;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	h2 {
		margin: 0;
		padding: 0 0 0.5rem 0;
	}

	section {
		padding: 2rem;
		border-radius: 5px;
		box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.4), 0 0 16px 4px rgba(0, 0, 0, 0.2);
		margin: 1rem;
	}
</style>
