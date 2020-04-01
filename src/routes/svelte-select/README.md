# svelte-select

A select/autocomplete component for Svelte apps.  With support for grouping, filtering, async and more.

## Demos

[🌱 Simple demo](https://svelte.dev/repl/a859c2ba7d1744af9c95037c48989193?version=3.12.1)

[🌻 Advanced demo](https://svelte.dev/repl/3e032a58c3974d07b7818c0f817a06a3?version=3.20.1)

## Installation

```bash
yarn add svelte-select
```

**Note:** Install as a dev dependency (yarn add svelte-select --dev) if using [Sapper](https://sapper.svelte.dev/) to avoid a SSR error.


## Usage

```html
<script>
  import Select from 'svelte-select';

  let items = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ];
  
  let selectedValue = undefined;
</script>

<Select {items} bind:selectedValue></Select>
```


## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | String | - | Array of items
| filterText | String | - | Text to filter list labels by
| placeholder | String | - | Placeholder text
| optionIdentifier | String | 'value' | Override default identifier
| listOpen | Boolean | false | Open/close list
| containerStyles | String | - | Add/override container styles 
| selectedValue | - | - | Selected value(s)
| isClearable | Boolean | true | Enable clearing selected items
| isCreatable | Boolean | false | Enable creating selected items
| isDisabled | Boolean | false | Disable select
| isMulti | Boolean | false | Enable multi select
| isSearchable | Boolean | true | Disable search/filtering
| isVirtualList | Boolean | false | Uses [svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list) to render list (experimental)
| itemFilter | Function | (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase()) | Item filter function
| groupBy | Function | - | Function to group list items
| groupFilter | Function | (groups) => groups | Group filter function
| isGroupHeaderSelectable | Boolean | false | Enable selectable group headers
| createGroupHeaderItem | Function | (groupValue) => { label:groupValue, value:groupValue  } | create item for group headers
| createItem | Function | (filterText) => { label:filterText, value:filterText } | create item function
| getOptionLabel | Function | (option, filterText) => option.isCreator ? \`Create "${filterText}"\` : option.label | Get option label function
| getSelectionLabel | Function | (option) => option.label | Get selection label function
| getGroupHeaderLabel | Function | (option) => option.label | Get group header label function
| handleClear | Function | - | Clears selection, closes list and dispatches event
| Item | Component | Item | Item component
| Selection | Component | Selection | Selection component
| MultiSelection | Component | MultiSelection | Multi selection component
| loadOptions | Promise | - | Method that returns a Promise that updates items
| noOptionsMessage | String | 'No options' | Message to display when there are no items  
| hideEmptyState | Boolean | false | Hide list when no options
| listPlacement | String | 'auto' | When 'auto' displays either 'top' or 'bottom' depending on viewport
| hasError | Boolean | false | Show error styles around select input (red border)
| inputAttributes | Object | - | Pass in attributes like 'id' to the Select input, for example {id: 'Food Selection', foo: 'something'}
| listAutoWidth | Boolean | true | List width will grow wider than the Select container (depending on list item content length)

### Styling

You can style a component by overriding [the available CSS variables](/docs/theming_variables.md).

```html
<script>
  import Select from 'svelte-select';
  
  const items = ['One', 'Two', 'Three'];
</script>

<style>
  .themed {
    --border: 3px solid blue;
    --borderRadius: 10px;
    --placeholderColor: blue;
  }
</style>

<div class="themed">
  <h2>Theming</h2>
  <Select {items}></Select>  
</div>
```

## Events

| Event Name | Callback | Description |
|------|------|----------|
| select | selectedValue | fires when selectedValue changes
| clear | - | fires when clear all is invoked

```html
<script>
  import Select from 'svelte-select';

  let items = [...];
  function handleSelect(selectedVal) {
    ...
  }
  function onClear() {
    ...
  }
</script>

<Select {items} on:select={handleSelect} on:clear={handleClear}></Select>
```

## Development

```bash
yarn global add serve@8
yarn
yarn dev
yarn test:browser
```

In your favourite browser go to http://localhost:3000 and open devtools and see the console for the test output. When developing its handy to see the component on the page; comment out the `select.$destroy();` on the last test in /test/src/index.js or use the `test.only()` to target just one test.

For example: 

```js
test.only('when getSelectionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      selectedValue: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  //select.$destroy();
});

```


## Configuring webpack

If you're using webpack with [svelte-loader](https://github.com/sveltejs/svelte-loader), make sure that you add `"svelte"` to [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config. This ensures that webpack imports the uncompiled component (`src/index.html`) rather than the compiled version (`index.mjs`) — this is more efficient.

If you're using Rollup with [rollup-plugin-svelte](https://github.com/rollup/rollup-plugin-svelte), this will happen automatically.


## License

[LIL](LICENSE)
