# Svelte Shared

## Stores

### writableLocalStorage

Saves the store's value to local storage. The store's value will also update if the local storage value is changed in a different tab or window.

```
import { writableLocalStorage } from 'svelte-shared;
const store = writableLocalStorage('key', 'initialValue');
$store.set('Test');
```

### readableLocalStorage

Readable store that will automatically update when the local storage's value changes.

```
import { readableLocalStorage } from 'svelte-shared;
const store = readableLocalStorage('key', 'initialValue');
```
