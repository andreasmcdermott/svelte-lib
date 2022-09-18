# Svelte Shared

## Stores

### writableLocalStorage

Saves the store's value to local storage. The store's value will also update if the local storage value is changed in a different tab or window.

```
<script>
  import { writableLocalStorage } from 'svelte-shared/store;
  const store = writableLocalStorage('key', 'initialValue');
  $store.set('Test');
</script>
```

### readableLocalStorage

Readable store that will automatically update when the local storage's value changes.

```
<script>
  import { readableLocalStorage } from 'svelte-shared/store;
  const store = readableLocalStorage('key', 'initialValue');
</script>
```

### Undoable

Writable store that supports undo and redo actions.

```
<script>
  import { undoable } from 'svelte-shared/store';
  const store = undoable('');
  store.set('123'); // Store is '123'
  store.undo(); // Store is ''
  store.redo(); // Store is '123'
</script>
```

## Actions

### Shortcut

Add a keyboard shortcut to an element. Depending on the element, the shortcut will:

- Button or link: click
- Input, textarea, or any element with tabIndex set to a value other than -1: focus

```
<script>
  import { shortcut } from 'svelte-shared/action';
</script>

<button on:click={() => { console.log('Click); }} use:shortcut={'Cmd+K'}>Klick</button>
```
