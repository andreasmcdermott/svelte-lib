<script lang="ts">
	import { readableLocalStorage, writableLocalStorage, undoable } from '$lib/store';
	import { shortcut } from '$lib/action';
	const writableStore = writableLocalStorage('my-store', '');
	const readableStore = readableLocalStorage('my-store');
	const undoableStore = undoable();
</script>

<main>
	<div class="row">
		<section>
			<h2>writableLocalStorage</h2>
			<input type="text" bind:value={$writableStore} />
		</section>
		<section>
			<h2>readableLocalStorage</h2>
			<div>{$readableStore}</div>
		</section>
		<section>
			<h2>undoable</h2>
			<p>You can also use keyboard shortcuts:</p>
			<ul>
				<li>Ctrl+F - focus input</li>
				<li>CMd+Z - undo</li>
				<li>Cmd+Shift+Z - redo</li>
			</ul>
			<input type="text" bind:value={$undoableStore} use:shortcut={'Ctrl+F'} />
			<div style:margin-top="0.5rem">
				<button on:click={undoableStore.undo} use:shortcut={'Cmd+Z'}>Undo</button>
				<button on:click={undoableStore.redo} use:shortcut={'Cmd+Shift+Z'}>Redo</button>
			</div>
		</section>
	</div>
</main>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
		font-size: 14px;
	}

	:global(*) {
		box-sizing: border-box;
	}
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: radial-gradient(circle at top left, purple, hotpink);
	}

	.row {
		display: flex;
	}

	h2 {
		margin: 0;
		padding: 0 0 1rem 0;
		font-size: 1.5rem;
	}

	section {
		background: white;
		padding: 2rem;
		border-radius: 5px;
		box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.4), 0 0 16px 4px rgba(0, 0, 0, 0.2);
		margin: 1rem;
	}

	p {
		margin: 0;
		padding: 0;
	}

	ul {
		margin: 0;
		padding: 0.5rem 2rem;
	}

	input {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
		font-size: 1.1rem;
	}

	input[type='text'] {
		width: 100%;
		padding: 0.35rem 0.5rem;
		border-radius: 3px;
		border: 2px solid slateblue;
	}

	button {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
		font-size: 1.1rem;
		border: 2px solid slateblue;
		background: slateblue;
		color: white;
		border-radius: 3px;
		padding: 0.35rem 0.5rem;
	}
</style>
