# vanilla-app-states

- [🇬🇧 English documentation](#🇬🇧-english-documentation)
- [🇪🇸 Documentación en español](#🇪🇸-documentación-en-español)

# 🇬🇧 English documentation

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating a state](#creating-a-state)
  - [Accessing a state](#accessing-a-state)
  - [Updating a state](#updating-a-state)
  - [Listening to state changes](#listening-to-state-changes)
  - [Using the state in the DOM](#using-the-state-in-the-dom)  
  - [Boolean states](#boolean-states)
  - [Rendering complex states](#rendering-complex-states)
  - [Rendering multiple times a state in the DOM](#rendering-multiple-times-a-state-in-the-dom)
  - [Using an enum state](#using-an-enum-state)
  - [Preserving a state in the localStorage](#preserving-a-state-in-the-localstorage)
- [Source](#source)

<a style="display: block; text-align: right;" href="#vanilla-app-states">Go back to language selection</a>

## Description

`vanilla-app-states` is a package that allows you to easily manage states in your vanilla web application.

In the context of this package, a state is a value that when updated could (if setup correctly) update also the UI, helping you write a more declarative code.

In the latest version of this package, now you could also preserve your states in localStorage, helping you maintain the state of your application between sessions.

In this documentation you'll learn how to use states created with this package for various applications, such as: conditionally rendering content, preserving data between sessions, restricting its possible values, updating content in the UI, and rendering complex data structures.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

## Installation

To install this package, run the following command in your terminal:

```bash
npm i vanilla-app-states
```

Now create a javascript file that imports the `State` class that you will use to create states:

```javascript
import { State } from 'vanilla-app-states'
```

> If you want to start learning how to create states directly you can skip to the section [creating a state](#creating-a-state)

Since you are importing the `State`, when adding the script to your html file, make sure you specify that it is of type `module`. For example:

```html
<script type="module" src="./js/app.js"></script>
```

Also, in order to access the body elements you must make sure that the `<script>` tag is right after the `<body>` tag. For example:

```html
<body>
  <!-- Here goes the content of the body -->
</body>
<script type="module" src="./js/app.js"></script>
```

Another option is to add the `defer` attribute to the `<script>` tag that imports your javascript file. This will ensure that the script runs after the document is loaded and that the DOM is available to access the body elements.

```html
<!-- as the script is executed after the document is loaded it does not matter where you place it -->
<script type="module" src="./js/app.js" defer></script>
<body>
  <!-- Here goes the content of the body -->
</body>
```

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

## Usage

### Creating a state

To create a state, you simply create an instance of `State` and pass it an identifier and a value. For example:

```javascript
import { State } from 'vanilla-app-states'

const counterState = new State({
  id: 'counter',
  initial: 0
})
```

In this example, we have created a state called `counterState` with the initial value of `0`.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Accessing a state

To access a state, you can call the getter function of the `current` property of the `State` class. For example:

```javascript
console.log(counterState.current) // 0
```

In this example, we have called the `console.log` function and passed the state value `counterState.current` which prints the initial value of `0`.

> Note: The current property is a getter, so it cannot be modified directly. To update the state you can read the section [Updating a state](#updating-a-state). 

> Note: You can also access the state id from the `id` getter as follows: `counterState.id`.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Updating a state

To update a state, you simply call the `update` function of the `State` class instance. For example:

```javascript
counterState.update(1)
```

In this example, we have called the `update` function and passed the new value `1`. This will do the following:

1. Update status.
2. Update DOM elements that use the state. In case an `onRender` function is provided this is the step in which it will be called. For more information read [using the state in the DOM](#using-the-state-in-the-dom) or [rendering complex states with the `onRender` function](#rendering-complex-states).
3. Call the `onChange` function with the new value and the old value. [more information](#listening-to-state-changes)

> Note: actions are performed in the order previously mentioned. First the state is updated, then the DOM elements are updated and finally the `onChange` function is called. This could be very useful if you want to perform an action after the state has been updated, like adding events to rendered buttons or something like that.

If you want to set the initial value of the state, you can call the `reset` function of the `State` class instance instead of setting the initial value manually with `update`. For example:

```javascript
// ✅ do this
counterState.reset()

// ❌ don't do this
counterState.update(0)
```

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Listening to state changes

To listen for changes in a state, you simply pass a function to the `onChange` parameter of the `State` constructor. For example:

```javascript
const counterState = new AppState({
  id: 'counter',
  initial: 0,
  onChange: (newValue, oldValue) => {
    console.log(`The counter value is: ${newValue}`)
    console.log(`The counter value was: ${oldValue}`)
  }
})
```

In this example, we have passed a function that will be executed when the state changes. The function will receive two parameters: `newValue` and `oldValue`. These parameters represent the new value and the old value of the state respectively.

> Note: This function is called right after the DOM is updated, therefore, if you specified and `onRender` function, the `onChange` function will be called after the `onRender` function has been executed. [About the onRender function](#rendering-complex-states)

> Note: The `onChange` function is optional. If not passed, the state will still be updated.

Of course, this function can also be extracted in order to increase the readability of your code. For example:

```javascript
const onCounterChange = (newValue, oldValue) => {
  console.log(`The counter value is: ${newValue}`)
  console.log(`The counter value was: ${oldValue}`)
}
const counterState = new AppState({
  id: 'counter',
  initial: 0,
  onChange: onCounterChange
})
```

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Using the state in the DOM

To use the state in the DOM, you simply need to create an element that has a `data-state` attribute with the state identifier. For example:

```html
<p>The counter value is: <span data-state="counter"></span></p>
```

In this example, we have created a `span` element with a `data-state` attribute that has the value `counter`. Inside the span with the `data-state` of `counter` (which is the state identifier), the current state value will be displayed, and every time the state is updated, the span value will be updated. Also the first time the state is initialized when creating the instance of the `State` class, its initial value will be displayed in the span.

> Note: this only works for states of type `string`, `number` and `bigint`. If the state is a boolean, it will conditionally render the DOM element or elements in which the data-state is set with the state id.
>
> For more information on using a boolean state you can read the subsection [Boolean states](#boolean-states) within the Using state in the DOM section.
>
> For more information on how to render states of types other than `string`, `number`, `bigint` or `boolean` you can read the subsection [Rendering complex states](#rendering-complex-states) within the using the state in the DOM section.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Boolean states

If the state is a boolean, elements it is applied to will be conditionally rendered based on the state value. For example:

```javascript
const shouldShowParagraphState = new State({
  id: 'shouldShowParagraph',
  initial: true
})
```

```html
<p data-state="shouldShowParagraph">
  This paragraph will be rendered conditionally based on the state value
</p>
```

In this example, the paragraph with the `data-state` of `shouldShowParagraph` will be rendered if `shouldShowParagraphState` is `true`. If the state is `false`, the paragraph will not be rendered.

Therefore, if we change the value of `shouldShowParagraphState` to `false`, the paragraph will not be rendered to the DOM. For example:

```javascript
shouldShowParagraphState.update(false)
```

> Note: In the current version of this package, when the boolean state is set to `false`, this will simply set a `display: none` style to the element or elements that have the `data-state` attribute with the state id. This might change in the future.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Rendering complex states

If the state is a complex type, such as an `object` or an `array` (of type `object`), you can pass a function to the `onRender` parameter of the `State` constructor. This function will be executed every time the state changes and will receive the new state as a parameter. The `onRender` function parameter must return a `string` that will represent the content to be inserted into the DOM in all those elements where the `data-state` corresponds to the state identifier.

Below is an example with a state that is an array of objects to create a to-do list app:

```html
<!-- Here you create the form to add things to do -->
<form id="todo-form">
  <input type="text" name="todo" id="todo">
  <button type="submit">Add Todo</button>
</form>
<ul data-state="todos">
  <!-- Here the HTML returned as a template string from the onRender function will be rendered. -->
</ul>
```

```javascript
const todos = new State({
  id: 'todos',
  initial: [],
  onRender: (currentState) => {
    /* Here we specify how the state will be rendered returning a string of the HTML to be inserted */
    return currentState
      .map(
        (todo) => `
        <li id="todo-${todo.id}">
          <p>${todo.text} - ${todo.isCompleted ? 'completed' : 'not completed'}</p>
          <button data-action="toggle-completed">Toggle completed</button>
          <button data-action="remove">Remove</button>
        </li>
        `
      )
      .join('')
      /* notice the todo- prefix in the id attribute, this is because the todo.id is a UUID, and UUIDS might start with a number and querying the DOM with a number as an id will not work */
  },
  onChange: onTodosChange,
})

const handleToggleCompleted = (todo) => {
  todos.update(todos.current.map(t => {
    if (t.id === todo.id) {
      return {
        ...t,
        isCompleted: !t.isCompleted
      }
    }
    return t
  }))
}
const handleRemoveTodo = (todo) => {
  todos.update(todos.current.filter(t => t.id !== todo.id))
}

// this set will keep track of the todos from the DOM that already have event listeners attached
// this will help us avoid adding the same event listeners to the same buttons multiple times
const todosWithListeners = new Set()
/* Here we add the event listeners to the buttons */
function onTodosChange(current, previous) {
  // Event listeners only need to be set if a todo is added to the list
  // So if the current state has fewer elements or the same number of elements as the previous state
  // event listeners should not be set
  if (current.length <= previous.length) return
  // we need to get the todos list container every time the state changes because if we don't
  // we won't have the correct reference to the list
  const $todosList = document.querySelector('ul[data-state="todos"]')
  for (const todo of current) {
    // if the todo already has event listeners attached, we skip it
    if (todosWithListeners.has(todo.id)) continue
    // otherwise we get the todo element
    const $todoElement = $todosList.querySelector(`li#todo-${todo.id}`)
    // set the events to the todo buttons
    const $bToggleCompleted = $todoElement.querySelector('button[data-action="toggle-completed"]')
    $bToggleCompleted.addEventListener('click', () => handleToggleCompleted(todo))

    const $removeButton = $todoElement.querySelector('button[data-action="remove"]')
    $removeButton.addEventListener('click', () => handleRemoveTodo(todo))
    // and add the todo id to the set of todos with listeners
    todosWithListeners.add(todo.id)
  }
}
// here we add todos to the list when the form is submitted
const $todoForm = document.getElementById('todo-form')
$todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!$todoForm.todo.value) return
  todos.update([
    ...todos.current,
    {
      id: crypto.randomUUID(),
      text: $todoForm.todo.value,
      isCompleted: false
    }
  ])
  $todoForm.reset()
})
```

Notice that we created a set to keep track of the todos from the DOM that already have event listeners attached. This is to prevent adding the same event listeners to the same buttons multiple times which could result in unexpected behavior.

It would be a mistake to add the event listeners in the `onRender` function, since the string returned by `onRender` is used to create a new representation of the DOM, loosing the events that have been assigned to the elements within the returned string.

Notice that, even though the `onRender` function is creating a whole new string of HTML every time the state changes, this whole content is NOT being inserted into the DOM every time the state changes, but instead, it is only updating the necessary elements that have changed thanks to the [morphdom library](https://www.npmjs.com/package/morphdom). You could see it in the following video:

![demonstrating morphdom minimal dom updates](./assets/gifs/demonstrating-morphdom-minimal-dom-updates.gif)

Keep in mind that even though we've demonstrated how you could use the `onRender` function to render states of types other than `string`, `number`, `bigint` or `boolean`, since this function overwrites the default rendering of the state, you could also use it to render states of other types, here's an example:

```html
<p>I have <span data-state="yearsCounter"></span></p>
<button id="button-increment-years">Increment years</button>
```

```javascript
const yearsCounter = new State({
  id: 'yearsCounter',
  initial: 1,
  onRender: (current) => `${current} year${current === 1 ? '' : 's'}`,
})

const $buttonIncrementYears = document.getElementById('button-increment-years')
$buttonIncrementYears.addEventListener('click', () => {
  yearsCounter.update(yearsCounter.current + 1)
})
```

This will result in the following behavior:

![onRender function with other types demonstration](./assets/gifs/onrender-with-other-types.gif)

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Rendering multiple times a state in the DOM

Since the `data-state` property can be set to more than one element in the DOM, you can create a state that renders to multiple elements in the DOM. For example:

```html
<main>
  <p>The counter value is: <span data-state="counter"></span></p>
  <p>Here I can show the counter again: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0
})
```

In this example, we have created a state called `counterState` with the initial value of `0`. And we associate two `span` elements of the dom with the `counterState` state using the `data-state` attribute. Now whenever the counterState is updated, it will be rendered on both `span` elements.

Initially, when creating the state, all elements that have the `data-state` attribute set with the id of the state are obtained from the DOM. By default, elements are fetched from the `document.body`. However, this can be inefficient, especially if state is rendered across many DOM elements. To avoid this, when you create the state you can specify a `wrapper` which will be the element to use to get all elements with a `data-state` attribute with the id of the state. This can be especially useful if the state is rendered to multiple DOM elements and they are all inside a container.

Taking this into account we could modify the previous code as follows:

```html
<main>
  <p>The counter value is: <span data-state="counter"></span></p>
  <p>Here I can show the counter again: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0,
  wrapper: document.querySelector('main')
})
```

With this change, the state is obtained from the `main` element instead of the `document.body`. This makes it more efficient to search for elements in a well-defined scope, instead of searching the entire body of the document. Of course, in a file with as little content in the DOM as the example above, this would not be necessary. However, if we have a file with many elements it may be useful to specify a `wrapper`.

> Note: If a `wrapper` is not specified, the state is obtained from the `document.body`.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Using an enum state

You might want to create states that can only have a limited set of values. From now on, this states will be called enum states.

An enum state is created the same way as a regular state, but there are a few differences:

1. The state must be a string or a number.
2. You need to specify an array of possible values for the state.
3. The state can only be set to one of the possible values, this includes the initial value.

Let's see an example:

```javascript
const tabs = new State({
  id: 'tabs',
  initial: 'create',
  possibleValues: ['create', 'edit', 'delete'],
})
```

As you can see, the `possibleValues` array is an array of strings. This means that the state can only be set to one of the strings in the array. If you try to set the state to a value that is not in the array, you will get an error. For instance:

```javascript
tabs.update('example')
```

This will throw an error because the state can only be set to one of the strings in the `possibleValues` array.

As mentioned before, this also works for numbers:

```javascript
const options = new State({
  id: 'options',
  initial: 0,
  possibleValues: [0, 1, 2],
})
```

In this case, the state can only be set to one of the numbers in the array.

> Note: The `possibleValues` array must not be empty.

> Note: Same thing applies with an enum state of numbers, if you try to set the state to a value that is not in the array, you will get an error.

Now, keeping up with the string enum state example, note that you could also externalize the possible values to an object, this could come in handy to also set any value in the state:

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}

const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
})
```

In this case, the state can only be set to one of the values in the `modalTabs` object. And as you can see, now you don't have any `magic strings` in your code, and you could use the `modalTabs` object to update the state.

Let's see an example on how to use this tabs state with the `onRender` function, let's first create the HTML:

```html
<dialog open>
  <nav>
    <!-- The data-tab attribute will be used to change the state of the tabs -->
    <button class="tabSelectorButton" data-tab="create">Create</button>
    <button class="tabSelectorButton" data-tab="edit">Edit</button>
    <button class="tabSelectorButton" data-tab="delete">Delete</button>
  </nav>
  <section data-state="tabs"></section>
</dialog>
```

Now, let's create our state to manage the tabs of the modal(dialog): 

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
  onRender: (current) => {
    // Here we could use the current state to render the content of the tab
    // the current state determines which tab is active
    if (current === modalTabs.create) {
      return `<p>Create Tab</p>`
    }
    if (current === modalTabs.edit) {
      return `<p>Edit Tab</p>`
    }
    return `<p>Delete Tab</p>`
  }
})

// Here we get all the buttons that could change the state of the tabs
document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  // And for each button we add an event listener to change the state
  button.addEventListener('click', () => {
    // Here we use the data-tab attribute to change the state of the tabs
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

As you can see, the `onRender` function is a function that receives the current state as a parameter and returns a string that represents the content to be inserted into the DOM, in this case, the content of the active tab.

There's no problem with the previous implementation to create a system of tabs using a state, however for this specific use case, we could also use the `data-show-if` attribute to show or hide the content of the tabs based on the current value of the tabs state.

we simply need to modify our code to use the `data-show-if` attribute like so:

```html
<dialog open>
  <nav>
    <!-- The data-tab attribute will be used to change the state of the tabs -->
    <button class="tabSelectorButton" data-tab="create">Create</button>
    <button class="tabSelectorButton" data-tab="edit">Edit</button>
    <button class="tabSelectorButton" data-tab="delete">Delete</button>
  </nav>
  <!-- now we have an element for each tab, each with a data-show-if attribute -->
  <!-- if the value of the data-show-if attribute is the same as the current state of the tabs -->
  <!-- then the element will be shown -->
  <section data-state="tabs" data-show-if="create">
    <p>Create Tab</p>
  </section>
  <section data-state="tabs" data-show-if="edit">
    <p>Edit Tab</p>
  </section>
  <section data-state="tabs" data-show-if="delete">
    <p>Delete Tab</p>
  </section>
</dialog>
```

> Note: If there's a typo in the value of the `data-show-if` attribute, you will get an error. So for instance, if you would've written `crete` instead of `create`, you would get an error, since `crete` is not a possible value of the `possibleValues` array.

Now, let's create our state to manage the tabs of the modal(dialog): 

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}
/* now there's no need to use the onRender function, since the data-show-if attribute will determine which tab to show */
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs)
})

// Here we get all the buttons that could change the state of the tabs
document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  // And for each button we add an event listener to change the state
  button.addEventListener('click', () => {
    // Here we use the data-tab attribute to change the state of the tabs
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

> Note: You can't use the `data-show-if` and set an onRender function at the same time, since the `data-show-if` attribute will determine which tab to show, and the onRender function will determine the content of the tab.

Of course, you could still listen to changes in the state and update the DOM accordingly:

```javascript
/* .... */
const tabSelectorButtons = document.querySelectorAll('.tabSelectorButton')
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
  onChange: (current) => {
    /* this will add the active class to the button that is active */
    /* and remove the active class from the other buttons */
    tabSelectorButtons.forEach((button) => {
      if (button.getAttribute('data-tab') === current) button.classList.add('active')
      button.classList.remove('active')
    })
  }
})
tabSelectorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

Keep in mind this will also work for enum states of type `number`, take a look at the following example:

```html
<dialog open>
  <nav>
    <button class="tabSelectorButton" data-tab="1">Create</button>
    <button class="tabSelectorButton" data-tab="2">Edit</button>
    <button class="tabSelectorButton" data-tab="3">Delete</button>
  </nav>
  <section data-state="tabs" data-show-if="1">
    <p>Create Tab</p>
  </section>
  <section data-state="tabs" data-show-if="2">
    <p>Edit Tab</p>
  </section>
  <section data-state="tabs" data-show-if="3">
    <p>Delete Tab</p>
  </section>
</dialog>
```

```javascript
const modalTabs = {
  create: 1,
  edit: 2,
  delete: 3,
}
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs)
})

document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  button.addEventListener('click', () => {
    tabs.update(Number(button.getAttribute('data-tab')))
  })
})
```

In both cases this will result in the following behavior:

![data-show-if enum state demonstration](./assets/gifs/data-show-if-enum-state.gif)

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Preserving a state in the localStorage

To store a state in the localStorage and preserve it across sessions, you can use the `preserve` parameter of the `State` constructor. This parameter will determine whether the state should be preserved or not.

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0,
  preserve: true
})
```

In this example, the `counterState` will be preserved between sessions, so even if the user closes the page and reopens it or reloads it, the state will remain the same as the last time it was modified. Therefore, for the example above, if you increment the counter and reload the page, the counter will be reset to the previous value.

Here's a video demonstration of how the state is preserved across sessions in the localStorage (the video is a demonstration with the todo state):

![showing state preserve](./assets/gifs/showing-state-preserve.gif)

Notice that removing all todos, which calls this function:

```javascript
const $clearTodosButton = document.getElementById('clear-todos')
$clearTodosButton.addEventListener('click', () => {
  todos.reset()
})
```

Clears the state completely from the localStorage, this is because since the state is set to its initial value when the reset function is called, storing this initial value makes no sense at all, because the state already has the initial value set when the state instance is created.

## Source

The source code of this package is available on [GitHub](https://github.com/jorgeabrahan/vanilla-app-states).
Contributions are welcome.

This package is also published on [npm](https://www.npmjs.com/package/vanilla-app-states).

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

# 🇪🇸 Documentación en español

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Creando un estado](#creando-un-estado)
  - [Accediendo a un estado](#accediendo-a-un-estado)
  - [Actualizando un estado](#actualizando-un-estado)
  - [Escuchando cambios en un estado](#escuchando-cambios-en-un-estado)
  - [Utilizando el estado en el DOM](#utilizando-el-estado-en-el-dom)
  - [Estados booleanos](#estados-booleanos)
  - [Renderizando estados complejos](#renderizando-estados-complejos)
  - [Renderizando multiples veces un estado en el DOM](#renderizando-multiples-veces-un-estado-en-el-dom)
  - [Usando un estado enum](#utilizando-un-estado-enum)
- [Recursos](#recursos)

<a style="display: block; text-align: right;" href="#vanilla-app-states">Volver a la selección de idiomas</a>

## Descripción

`vanilla-app-states` es un paquete que te permite manejar estados en tu aplicación web vanilla de manera fácil.

En el contexto de este paquete, un estado es un valor que, cuando se actualiza, podría (si se configura correctamente) actualizar también la interfaz de usuario, lo que le ayudará a escribir un código más declarativo.

En la última versión de este paquete, ahora también puede conservar sus estados en el localStorage, lo que le ayudara a mantener el estado de su aplicación entre sesiones.

En esta documentación, aprenderá a utilizar los estados creados con este paquete para diversas aplicaciones, como: renderizar contenido condicionalmente, preservar datos entre sesiones, restringir sus posibles valores, actualizar contenido en la interfaz de usuario y renderizar estructuras de datos complejas.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

## Instalación

Para instalar este paquete, ejecuta el siguiente comando en tu terminal:

```bash
npm i vanilla-app-states
```

Ahora crea un archivo de javascript que importe la clase `State` que utilizaras para crear estados:

```javascript
import { State } from 'vanilla-app-states'
```

> Si quieres empezar a aprender como crear estados directamente puedes saltarte a la sección [creando un estado](#creando-un-estado)

Ya que estás importando el `State` en este archivo, al agregar el script en tu archivo html, asegurate que especifiques que es de tipo `module`. Por ejemplo:

```html
<script type="module" src="./js/app.js"></script>
```

Además, a fin de tener acceso a los elementos del body, debes asegurarte de que la etiqueta `<script>` esté justo despues de la etiqueta `<body>`. Por ejemplo:

```html
<body>
  <!-- Aquí va el contenido del body -->
</body>
<script type="module" src="./js/app.js"></script>
```

Otra opción es agregar el atributo `defer` a la etiqueta `<script>` que importe tu archivo de javascript. Esto asegurará que el script se ejecute después de que el documento esté cargado y que el DOM esté disponible para acceder a los elementos del body.

```html
<!-- como el script se ejecuta después de que el documento esté cargado da igual donde lo posiciones -->
<script type="module" src="./js/app.js" defer></script>
<body>
  <!-- Aquí va el contenido del body -->
</body>
```

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

## Uso

### Creando un estado

Para crear un estado, simplemente debes crear una instancia de `State` y pasarle un identificador y un valor. Por ejemplo:

```javascript
import { State } from 'vanilla-app-states'

const counterState = new State({
  id: 'counter',
  initial: 0
})
```

En este ejemplo, hemos creado un estado llamado `counterState` con el valor inicial de `0`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Accediendo a un estado

Para acceder a un estado, puedes llamar la funcion getter `current` de la clase `State`. Por ejemplo: 

```javascript
console.log(counterState.current) // 0
```

En este ejemplo, hemos llamado a la función `console.log` y pasado el valor del estado `counterState.current` que imprime el valor inicial de `0`.

> Nota: La propiedad current es un getter, por lo que no se puede modificar directamente. Para actualizar el estado puedes leer la seccion [Actualizando un estado](#actualizando-un-estado).

> Nota: También puedes acceder al id del estado desde el getter `id` de la siguiente manera: `counterState.id`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Actualizando un estado

Para actualizar un estado, simplemente debes llamar a la función `update` de la instancia de la clase `State`. Por ejemplo:

```javascript
counterState.update(1)
```

En este ejemplo, hemos llamado a la función `update` y pasado el nuevo valor `1`. Esto va a hacer lo siguiente:

1. Actualizar el estado.
2. Actualizar los elementos del DOM que utilicen el estado. En caso de que se especifique una funcion `onRender` es en este paso en el que sera llamada. Para mas información lea [utilizando el estado en el DOM](#utilizando-el-estado-en-el-dom) o [renderizando estados complejos con la funcion `onRender`](#renderizando-estados-complejos).
3. Llamar la función `onChange` con el nuevo valor y el valor anterior del estado. [más información](#listening-to-state-changes)

> Nota: las acciones se realizan en el orden mencionado anteriormente. Primero se actualiza el estado, luego se actualizan los elementos DOM y finalmente se llama a la función `onChange`. Esto podría resultar muy útil si desea realizar una acción después de que se haya actualizado el estado, como agregar eventos a los botones renderizados o algo así.

Si quieres establecer el valor inicial del estado, puedes llamar a la función `reset` de la instancia de la clase `State` en lugar de establecer el valor inicial manualmente con `update`. Por ejemplo:

```javascript
// ✅ Haz esto
counterState.reset()

// ❌ No hagas esto
counterState.update(0)
```

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Escuchando cambios en un estado

Para escuchar cambios en un estado, simplemente debes pasar una funcion al parametro `onChange` del constructor de `State`. Por ejemplo:

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0,
  onChange: (newValue, oldValue) => {
    console.log(`El valor del contador es: ${newValue}`)
    console.log(`El valor del contador era: ${oldValue}`)
  }
})
```

En este ejemplo, hemos pasado una funcion que se ejecutará cuando el estado cambie. La funcion recibirá dos parámetros: `newValue` y `oldValue`. Estos parámetros representan el nuevo valor y el valor anterior del estado respectivamente.

> Nota: Esta función se llama inmediatamente después de que se actualiza el DOM, por lo tanto, si especificó una función `onRender`, la función `onChange` se llamará después de que se haya ejecutado la función `onRender`. [Acerca de la función onRender](#renderizando-estados-complejos)

> Nota: La funcion `onChange` es opcional. Si no se pasa, el estado igual sera actualizado.

Por supuesto, esta funcion tambien puede ser extraída a fin de aumentar la legibilidad de tu código. Por ejemplo:

```javascript
const onCounterChange = (newValue, oldValue) => {
  console.log(`El valor del contador es: ${newValue}`)
  console.log(`El valor del contador era: ${oldValue}`)
}
const counterState = new State({
  id: 'counter',
  initial: 0,
  onChange: onCounterChange
})
```

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Utilizando el estado en el DOM

Para utilizar el estado en el DOM, simplemente debes crear un elemento que tenga un atributo `data-state` con el identificador del estado. Por ejemplo:

```html
<p>El valor del contador es: <span data-state="counter"></span></p>
```

En este ejemplo, hemos creado un elemento `span` con un atributo `data-state` que tiene el valor `counter`. Dentro de el span con el `data-state` de `counter` (que es el identificador del estado), se mostrará el valor actual del estado, y cada vez que se actualice el estado, se actualizará el valor del span. Tambien la primera vez que se inicialice el estado al crear la instancia de la clase `State`, se mostrará su valor inicial en el span.

> Nota: esto solo funciona para los estados del tipo `string`, `number` y `bigint`. Si el estado es un booleano renderizara condicionalmente el elemento o elementos del DOM en los que se establezca el data-state con el id del estado.

> Para más información sobre el uso de un estado booleano puedes leer la subseccion [Estados booleanos](#estados-booleanos) dentro de la seccion Utilizando el estado en el DOM.

> Para más información sobre como renderizar estados de otros tipos que no sean `string`, `number`, `bigint` o `boolean` puedes leer la subseccion [Renderizando estados complejos](#renderizando-estados-complejos) dentro de la seccion Utilizando el estado en el DOM.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Estados booleanos

Si el estado es un booleano, los elementos en los que se aplique se renderizarán condicionalmente en función del valor del estado. Por ejemplo:

```javascript
const shouldShowParagraphState = new State({
  id: 'shouldShowParagraph',
  initial: true
})
```

```html
<p data-state="shouldShowParagraph">
  Este parrafo se renderizará condicionalmente en función del valor del estado
</p>
```

En este ejemplo, el parrafo con el `data-state` de `shouldShowParagraph` se renderizará si `shouldShowParagraphState` es `true`. Si el estado es `false`, el parrafo no se renderizará. 

Por lo tanto, si cambiamos el valor de `shouldShowParagraphState` a `false`, el parrafo no se renderizará en el DOM. Por ejemplo:

```javascript
shouldShowParagraphState.update(false)
```

> Nota: En la versión actual de este paquete, cuando el estado booleano se establece en `false`, esto simplemente establecerá un estilo `display: none` para el elemento o elementos que tienen el atributo `data-state` con el id del estado. Esto podría cambiar en el futuro.


<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Renderizando estados complejos

Si el estado es un tipo complejo, como un `object` o un `array` (de tipo `object`), puede pasar una función al parámetro `onRender` del constructor `State`. Esta función se ejecutará cada vez que cambie el estado y recibirá el nuevo estado como parámetro. El parámetro de la función `onRender` debe devolver una `string` que representará el contenido a insertar en el DOM en todos aquellos elementos donde el `data-state` corresponde al identificador de estado.

A continuación se muestra un ejemplo con un estado que es un arreglo de objetos para crear una aplicación de lista de tareas pendientes:

```html
<!-- Aquí creas el formulario para agregar cosas que hacer. -->
<form id="todo-form">
  <input type="text" name="todo" id="todo">
  <button type="submit">Agregar cosa por hacer</button>
</form>
<ul data-state="todos">
  <!-- Aquí se renderizará el HTML devuelto como string de la función onRender. -->
</ul>
```

```javascript
const todos = new State({
  id: 'todos',
  initial: [],
  onRender: (currentState) => {
    /* Aquí especificamos cómo se representará el estado devolviendo una cadena del HTML que se insertará */
    return currentState
      .map(
        (todo) => `
        <li id="todo-${todo.id}">
          <p>${todo.text} - ${todo.isCompleted ? 'completed' : 'not completed'}</p>
          <button data-action="toggle-completed">Toggle completed</button>
          <button data-action="remove">Remove</button>
        </li>
        `
      )
      .join('')
      /* observe el prefijo todo- en el atributo id, esto se debe a que todo.id es un UUID, y los UUIDS pueden comenzar con un número y hacer un query en el DOM buscando un elemento cuyo id empiece con un número lanzara un error */
  },
  onChange: onTodosChange,
})

const handleToggleCompleted = (todo) => {
  todos.update(todos.current.map(t => {
    if (t.id === todo.id) {
      return {
        ...t,
        isCompleted: !t.isCompleted
      }
    }
    return t
  }))
}
const handleRemoveTodo = (todo) => {
  todos.update(todos.current.filter(t => t.id !== todo.id))
}

// este 'Set' realizará un seguimiento de todos los 'todos' (o cosas por hacer) del DOM que ya tengan un event listener asociado
// esto nos ayudará a evitar agregar event listeners a los mismos botones varias veces
const todosWithListeners = new Set()
/* Aqui agregamos event listeners a los botones */
function onTodosChange(current, previous) {
  // Solo se tienen que establecer event listeners si se agregaron tareas a la lista
  // Por lo que si el estado actual tiene menos elementos o la misma cantidad de elementos que el estado anterior
  // no se deben establecer event listeners
  if (current.length <= previous.length) return
  // Necesitamos obtener el contenedor de la lista de tareas cada vez que cambia el estado porque si no lo hacemos
  // no tendremos la referencia correcta a la lista
  const $todosList = document.querySelector('ul[data-state="todos"]')
  for (const todo of current) {
    // Si el 'todo' ya tiene establecidos los event listeners, lo omitimos.
    if (todosWithListeners.has(todo.id)) continue
    // en caso contrario obtenemos el elemento del DOM que representa el 'todo'
    const $todoElement = $todosList.querySelector(`li#todo-${todo.id}`)
    // y establecemos los event listeners a los botones
    const $bToggleCompleted = $todoElement.querySelector('button[data-action="toggle-completed"]')
    $bToggleCompleted.addEventListener('click', () => handleToggleCompleted(todo))

    const $removeButton = $todoElement.querySelector('button[data-action="remove"]')
    $removeButton.addEventListener('click', () => handleRemoveTodo(todo))
    // por ultimo agregamos el id del 'todo' a la lista de todos con event listeners
    todosWithListeners.add(todo.id)
  }
}
// aqui agregamos cosas por hacer a la lista cuando el formulario de creación de tareas es enviado
const $todoForm = document.getElementById('todo-form')
$todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!$todoForm.todo.value) return
  todos.update([
    ...todos.current,
    {
      id: crypto.randomUUID(),
      text: $todoForm.todo.value,
      isCompleted: false
    }
  ])
  $todoForm.reset()
})
```

Observe que creamos un `Set` para realizar un seguimiento de los 'todos' (o cosas por hacer) del DOM que ya tienen event listeners en sus botones. Esto es para evitar agregar event listeners a los mismos botones varias veces, lo que podría provocar un comportamiento inesperado.

Sería un error agregar los event listeners en la función `onRender`, ya que la cadena devuelta por `onRender` se usa para crear una nueva representación del DOM, perdiendo los eventos que han sido asignados a los elementos dentro de la cadena devuelta.

Tenga en cuenta que, aunque la función `onRender` crea una cadena HTML completamente nueva cada vez que cambia el estado, No se esta insertando todo este contenido en el DOM cada vez que cambia el estado, sino que solo se actualizan los elementos que han cambiado gracias a la [biblioteca morphdom](https://www.npmjs.com/package/morphdom). Esto se puede apreciar en el siguiente vídeo:

![demonstrating morphdom minimal dom updates](./assets/gifs/demonstrating-morphdom-minimal-dom-updates.gif)

Tenga en cuenta que, aunque hemos demostrado cómo se puede utilizar la función `onRender` para representar estados de tipos distintos de `string`, `number`, `bigint` o `boolean`, dado que esta función sobrescribe la representación predeterminada de el estado, también puedes usarlo para representar estados de otros tipos, aquí tienes un ejemplo:

```html
<p>I have <span data-state="yearsCounter"></span></p>
<button id="button-increment-years">Incrementar años</button>
```

```javascript
const yearsCounter = new State({
  id: 'yearsCounter',
  initial: 1,
  onRender: (current) => `${current} year${current === 1 ? '' : 's'}`,
})

const $buttonIncrementYears = document.getElementById('button-increment-years')
$buttonIncrementYears.addEventListener('click', () => {
  yearsCounter.update(yearsCounter.current + 1)
})
```

Esto dará como resultado el siguiente comportamiento:

![onRender function with other types demonstration](./assets/gifs/onrender-with-other-types.gif)

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Renderizando multiples veces un estado en el DOM

Como la propiedad `data-state` se puede establecer a mas de un elemento en el DOM, puedes crear un estado que se renderice en varios elementos en el DOM. Por ejemplo:

```html
<main>
  <p>El valor del contador es: <span data-state="counter"></span></p>
  <p>Aquí puedo volver a mostrar el contador: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0
})
```

En este ejemplo, hemos creado un estado llamado `counterState` con el valor inicial de `0`. Y asociamos dos elementos `span` del dom con el estado `counterState` utilizando el atributo `data-state`. Ahora cada vez que el counterState se actualice, se renderizará en ambos elementos `span`.

Inicialmente, al crear el estado se obtienen del DOM todos los elementos que tengan establecido el atributo `data-state` con el id del estado. Por defecto, los elementos se obtienen desde el `document.body`. Sin embargo, esto puede resultar ineficiente, en especial si el estado se renderiza en muchos elementos del DOM. Para evitar esto, cuando crees el estado puedes especificar un `wrapper` que será el elemento que se utilizará para obtener todos los elementos con un atributo `data-state` con el id del estado. Esto puede resultar especialmente útil si el estado se renderiza en varios elementos del DOM y todos estan dentro de un contenedor.

Teniendo esto en cuenta podriamos modificar el codigo anterior de la siguiente manera:

```html
<main>
  <p>El valor del contador es: <span data-state="counter"></span></p>
  <p>Aquí puedo volver a mostrar el contador: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0,
  wrapper: document.querySelector('main')
})
```

Con este cambio, el estado se obtiene del elemento `main` en lugar del `document.body`. Esto permite eficientizar la busqueda de los elementos en un scope bien definido, en lugar de buscar en todo el body del documento. Por supuesto, en un archio con tan poco contenido en el DOM como el ejemplo anterior, esto no sería necesario. Sin embargo, si tenemos un archivo con muchos elementos puede ser útil especificar un `wrapper`.


> Nota: Si no se especifica un `wrapper`, el estado se obtiene del `document.body`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Utilizando un estado enum

Es posible que desee crear estados que solo puedan tener un conjunto limitado de valores. De ahora en adelante, estos estados se llamarán estados enumerados.

Un estado de enumeración se crea de la misma manera que un estado normal, pero existen algunas diferencias:

1. El estado debe ser una cadena o un número.
2. Debe especificar una serie de valores posibles para el estado.
3. El estado solo se puede establecer en uno de los valores posibles, esto incluye el valor inicial.

Veamos un ejemplo:

```javascript
const tabs = new State({
  id: 'tabs',
  initial: 'create',
  possibleValues: ['create', 'edit', 'delete'],
})
```

Como puede ver, el parametro `possibleValues` es arreglo de `string`. Esto significa que el estado sólo se puede establecer en una de las `string` del arreglo. Si intenta establecer el estado en un valor que no está en el arreglo, obtendrá un error. Por ejemplo:

```javascript
tabs.update('example')
```

Esto generará un error porque el estado solo se puede establecer a uno de los valores del arreglo `possibleValues`.

Como se mencionó anteriormente, esto también funciona para números:

```javascript
const options = new State({
  id: 'options',
  initial: 0,
  possibleValues: [0, 1, 2],
})
```

En este caso, el estado sólo se puede establecer en uno de los números del arreglo.

> Nota: El arreglo `possibleValues` no debe estar vacío. 

> Nota: Lo mismo aplica con un estado enum de números; si intenta establecer el estado en un valor que no está en los `possibleValues`, obtendrá un error.

Ahora, siguiendo con el ejemplo del estado enum de `string`, tenga en cuenta que también puede externalizar los valores posibles a un objeto, lo que podría resultar útil para establecer también cualquier valor en el estado:

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}

const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
})
```

En este caso, el estado solo se puede establecer en uno de los valores del objeto `modalTabs`. Y como puedes ver, ahora no tienes ninguna `magic string` en tu código y puedes usar el objeto `modalTabs` para actualizar el estado.

Veamos un ejemplo de cómo usar este estado de pestañas con la función `onRender`, primero creemos el HTML:

```html
<dialog open>
  <nav>
    <!-- El atributo data-tab se utilizará para cambiar el estado de las pestañas. -->
    <button class="tabSelectorButton" data-tab="create">Create</button>
    <button class="tabSelectorButton" data-tab="edit">Edit</button>
    <button class="tabSelectorButton" data-tab="delete">Delete</button>
  </nav>
  <section data-state="tabs"></section>
</dialog>
```

Ahora, creemos nuestro estado para administrar las pestañas del modal (diálogo):

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
  onRender: (current) => {
    // Aquí podríamos usar el estado actual para representar el contenido de la pestaña.
    // el estado actual determina qué pestaña está activa
    if (current === modalTabs.create) {
      return `<p>Create Tab</p>`
    }
    if (current === modalTabs.edit) {
      return `<p>Edit Tab</p>`
    }
    return `<p>Delete Tab</p>`
  }
})

// Aquí obtenemos todos los botones que podrían cambiar el estado de las pestañas.
document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  // Y para cada botón agregamos un detector de eventos para cambiar el estado.
  button.addEventListener('click', () => {
    // Aquí usamos el atributo data-tab para cambiar el estado de las pestañas.
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

Como puedes ver, la función `onRender` es una función que recibe como parámetro el estado actual y devuelve una cadena que representa el contenido a insertar en el DOM, en este caso, el contenido de la pestaña activa.

No hay ningún problema con la implementación anterior para crear un sistema de pestañas usando un estado, sin embargo, para este caso de uso específico, también podríamos usar el atributo `data-show-if` para mostrar u ocultar el contenido de las pestañas según el estado actual. valor del estado de las pestañas.

Simplemente necesitamos modificar nuestro código para usar el atributo `data-show-if` así:

```html
<dialog open>
  <nav>
    <!-- El atributo data-tab se utilizará para cambiar el estado de las pestañas. -->
    <button class="tabSelectorButton" data-tab="create">Create</button>
    <button class="tabSelectorButton" data-tab="edit">Edit</button>
    <button class="tabSelectorButton" data-tab="delete">Delete</button>
  </nav>
  <!-- ahora tenemos un elemento para cada pestaña, cada una con un atributo data-show-if -->
  <!-- si el valor del atributo data-show-if es el mismo que el estado actual de las pestañas -->
  <!-- entonces se mostrará el elemento -->
  <section data-state="tabs" data-show-if="create">
    <p>Create Tab</p>
  </section>
  <section data-state="tabs" data-show-if="edit">
    <p>Edit Tab</p>
  </section>
  <section data-state="tabs" data-show-if="delete">
    <p>Delete Tab</p>
  </section>
</dialog>
```

> Nota: Si hay un error tipográfico en el valor del atributo `data-show-if`, obtendrá un error. Entonces, por ejemplo, si hubiera escrito `creta` en lugar de `create`, obtendría un error, ya que `creta` no es un valor posible del arreglo `posiblesValues`.

Ahora, creemos nuestro estado para administrar las pestañas del modal (diálogo):

```javascript
const modalTabs = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
}
/* ahora no es necesario usar la función onRender, ya que el atributo data-show-if determinará qué pestaña mostrar */
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs)
})

// Aquí obtenemos todos los botones que podrían cambiar el estado de las pestañas.
document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  // Y para cada botón agregamos un detector de eventos para cambiar el estado.
  button.addEventListener('click', () => {
    // Aquí usamos el atributo data-tab para cambiar el estado de las pestañas.
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

> Nota: No puede usar `data-show-if` y configurar una función `onRender` al mismo tiempo, ya que el atributo `data-show-if` determinará qué pestaña mostrar y la función `onRender` determinará el contenido. de la pestaña.

Por supuesto, aún puedes escuchar los cambios en el estado y actualizar el DOM en consecuencia:

```javascript
/* .... */
const tabSelectorButtons = document.querySelectorAll('.tabSelectorButton')
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs),
  onChange: (current) => {
    /* esto agregará la clase activa al botón que está activo */
    /* y eliminar la clase activa de los otros botones */
    tabSelectorButtons.forEach((button) => {
      if (button.getAttribute('data-tab') === current) button.classList.add('active')
      button.classList.remove('active')
    })
  }
})
tabSelectorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabs.update(button.getAttribute('data-tab'))
  })
})
```

Tenga en cuenta que esto también funcionará para estados de enumeración de tipo "número". Mire el siguiente ejemplo:

```html
<dialog open>
  <nav>
    <button class="tabSelectorButton" data-tab="1">Create</button>
    <button class="tabSelectorButton" data-tab="2">Edit</button>
    <button class="tabSelectorButton" data-tab="3">Delete</button>
  </nav>
  <section data-state="tabs" data-show-if="1">
    <p>Create Tab</p>
  </section>
  <section data-state="tabs" data-show-if="2">
    <p>Edit Tab</p>
  </section>
  <section data-state="tabs" data-show-if="3">
    <p>Delete Tab</p>
  </section>
</dialog>
```

```javascript
const modalTabs = {
  create: 1,
  edit: 2,
  delete: 3,
}
const tabs = new State({
  id: 'tabs',
  initial: modalTabs.create,
  possibleValues: Object.values(modalTabs)
})

document.querySelectorAll('.tabSelectorButton').forEach((button) => {
  button.addEventListener('click', () => {
    tabs.update(Number(button.getAttribute('data-tab')))
  })
})
```

En ambos casos esto resultará en el siguiente comportamiento:

![data-show-if enum state demonstration](./assets/gifs/data-show-if-enum-state.gif)

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Preservando un estado en localStorage

Para almacenar un estado en localStorage y conservarlo entre sesiones, puede utilizar el parámetro `preserve` del constructor `State`. Este parámetro determinará si el estado debe conservarse o no.

```javascript
const counterState = new State({
  id: 'counter',
  initial: 0,
  preserve: true
})
```

En este ejemplo, el `counterState` se conservará entre sesiones, así aunque el usuario cierre la página y la vuelva a abrir o la recarge el estado se mantendra igual que como la ultima vez que lo modifico. Por lo tanto, para el ejemplo anterior, si incrementa el contador y recarga la página, el contador se restaurará al valor anterior.

Aquí hay una demostración en video de cómo se preserva el estado entre sesiones en el almacenamiento local (el video es una demostración con el estado `todo`):

![showing state preserve](./assets/gifs/showing-state-preserve.gif)

Observe que al eliminar todas las cosas por hacer, lo que llama a esta función:

```javascript
const $clearTodosButton = document.getElementById('clear-todos')
$clearTodosButton.addEventListener('click', () => {
  todos.reset()
})
```

Borra el estado completamente del almacenamiento local, esto se debe a que dado que el estado se establece en su valor inicial cuando se llama a la función `reset`, almacenar este valor inicial no tiene ningún sentido, porque el estado ya tiene el valor inicial establecido cuando se crea la instancia del estado.

## Recursos

El código fuente de este paquete está disponible en [GitHub](https://github.com/jorgeabrahan/vanilla-app-states).
Las contribuciones son bienvenidas.

Este paquete también está publicado en [npm](https://www.npmjs.com/package/vanilla-app-states).

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>
