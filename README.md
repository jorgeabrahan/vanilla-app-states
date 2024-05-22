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

<a style="display: block; text-align: right;" href="#vanilla-app-states">Go back to language selection</a>

## Description

`vanilla-app-states` is a package that allows you to easily manage states in your vanilla web application.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

## Installation

To install this package, run the following command in your terminal:

```bash
npm install vanilla-app-states
```

Now create a javascript file that imports the `AppState` package that you will use to create states:

```javascript
import { AppState } from 'vanilla-app-states'
```

> If you want to start learning how to create states directly you can skip to the section [creating a state](#creating-a-state)

Since you are importing this file, when adding the script to your html file, make sure you specify that it is of type `module`. For example:

```html
<script type="module" src="./js/app.js"></script>
```

Also, in order to access the body elements from the script you must make sure that the `<script>` tag that your javascript file imports is right after the `<body>` tag. For example:

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

To create a state, you simply create an instance of `AppState` and pass it an identifier and a value. For example:

```javascript
import { AppState } from 'vanilla-app-states'

const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0
})
```

In this example, we have created a state called `counterState` with the initial value of `0`.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Accessing a state

To access a state, you can call the getter function of the `stateCurrent` property of the `AppState` class. For example:

```javascript
console.log(counterState.stateCurrent) // 0
```

In this example, we have called the `console.log` function and passed the state value `counterState.stateCurrent` which prints the initial value of `0`.

> Note: The stateCurrent property is a getter, so it cannot be modified directly. To update the state you can read the section [Updating a state](#updating-a-state).

> Note: You can also access the state id from the `stateId` getter as follows: `counterState.stateId`.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Updating a state

To update a state, you simply call the `updateState` function of the `AppState` class instance. For example:

```javascript
counterState.updateState(1)
```

> Note: If you want to update the state to an initial value, you can call the `setInitialState` function of the `AppState` class instance instead of setting the initial value manually with `updateState`.

In this example, we have called the `updateState` function and passed the new value `1`. This will do the following:

1. Update status.
2. Call the `onStateChange` function with the new value and the old value. [more information](#listening-to-state-changes)
3. Update DOM elements that use the state. [more information](#using-the-state-in-the-dom)

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Listening to state changes

To listen for changes in a state, you simply pass a function to the `onStateChange` parameter of the `AppState` constructor. For example:

```javascript
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  onStateChange: (newValue, oldValue) => {
    console.log(`The counter value is: ${newValue}`)
    console.log(`The counter value was: ${oldValue}`)
  }
})
```

In this example, we have passed a function that will be executed when the state changes. The function will receive two parameters: `newValue` and `oldValue`. These parameters represent the new value and the old value of the state respectively.

> Note: The `onStateChange` function is optional. If not passed, the state will still be updated in both the DOM and the `stateCurrent` variable.

Of course, this function can also be extracted in order to increase the readability of your code. For example:

```javascript
const onCounterChange = (newValue, oldValue) => {
  console.log(`The counter value is: ${newValue}`)
  console.log(`The counter value was: ${oldValue}`)
}
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  onStateChange: onCounterChange
})
```

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Using the state in the DOM

To use state in the DOM, you simply create an element that has a `data-state` attribute with the state identifier. For example:

```html
<p>The counter value is: <span data-state="counter"></span></p>
```

In this example, we have created a `span` element with a `data-state` attribute that has the value `counter`. Inside the span with the `data-state` of `counter` (which is the state identifier), the current state value will be displayed, and every time the state is updated, the span value will be updated. Also the first time the state is initialized when creating the instance of the `AppState` class, its initial value will be displayed in the span.

> Note: this only works for states of type `string`, `number` and `bigint`. If the state is a boolean, it will conditionally render the DOM element or elements in which the data-state is set with the state id.

> For more information on using a boolean state you can read the subsection [Boolean states](#boolean-states) within the Using state in the DOM section.

> For more information on how to render states of types other than `string`, `number`, `bigint` or `boolean` you can read the subsection [Rendering complex states](#rendering-complex-states) within the using the state in the DOM section.

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Boolean states

If the state is a boolean, elements it is applied to will be conditionally rendered based on the state value. For example:

```javascript
const shouldShowParagraph = new AppState({
  stateId: 'shouldShowParagraph',
  stateInitial: true
})
```

```html
<p data-state="shouldShowParagraph">
  This paragraph will be rendered conditionally based on the state value
</p>
```

In this example, the paragraph with the `data-state` of `shouldShowParagraph` will be rendered if the `shouldShowParagraph` state is `true`. If the status is `false`, the paragraph will not be rendered.

Therefore, if we change the value of the `shouldShowParagraph` state to `false`, the paragraph will not be rendered to the DOM. For example:

```javascript
shouldShowParagraph.updateState(false)
```

<a style="display: block; text-align: right;" href="#🇬🇧-english-documentation">Go back to index</a>

### Rendering complex states

If the state is a complex type, such as an `object` or an `array` (of type `object`), you can pass a function to the `onRender` parameter of the `AppState` constructor. This function will be executed every time the state changes and will receive the new state as a parameter. The `onRender` parameter must return a `string` that will represent the content to be inserted into the DOM in all those elements where the `data-state` corresponds to the state identifier.

Below is an example with a state that is an array of objects to create a to-do list functionality:

```html
<!-- Here you create the form to add things to do -->
<form id="addTodoForm">
  <input type="text" name="todo" placeholder="Write something to do" />
  <button type="submit">Add</button>
</form>

<section data-state="todos">
  <!-- Here the HTML returned as a template string from the onRender function will be rendered. -->
</section>
```

```javascript
const addTodoForm = document.getElementById('addTodoForm')
/* Here you create the state that manages the to-do list */
const todos = new AppState({
  stateId: 'todos',
  stateInitial: [],
  onRender: (todos) => {
    const todosList = document.createElement('UL')
    todosList.innerHTML = todos.stateCurrent
      .map(
        (todo) => `
        <li>
          <span>${todo.text}</span>
          <button data-role="removeTodo" data-todo-id="${todo.id}">Remove</button>
        </li>
        `
      )
      .join('')
    todoList.querySelectorAll('button[data-role="removeTodo"]').forEach((button) => {
      button.addEventListener('click', () => {
        todos.updateState([
          ...todos.stateCurrent.filter((todo) => todo.id !== button.getAttribute('data-todo-id'))
        ])
      })
    })
    return todosList.outerHTML
  }
})
/* Aquí se agregan cosas por hacer al estado todos */
addTodoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!addTodoForm.todo.value) return
  const todo = {
    id: crypto.randomUUID(),
    text: addTodoForm.todo.value
  }
  todos.updateState([...todos.stateCurrent, todo])
  addTodoForm.reset()
})
```

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
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0
})
```

In this example, we have created a state called `counterState` with the initial value of `0`. And we associate two `span` elements of the dom with the `counterState` state using the `data-state` attribute. Now whenever the counterState is updated, it will be rendered on both `span` elements.

Inicialmente, al crear el estado se obtienen del DOM todos los elementos que tengan establecido el atributo `data-state` con el id del estado. Por defecto, los elementos se obtienen desde el `document.body`. Sin embargo, esto puede resultar ineficiente, en especial si el estado se renderiza en muchos elementos del DOM. Para evitar esto, cuando crees el estado puedes especificar un `stateWrapper` que será el elemento que se utilizará para obtener todos los elementos con un atributo `data-state` con el id del estado. Esto puede resultar especialmente útil si el estado se renderiza en varios elementos del DOM y todos estan dentro de un contenedor.

Teniendo esto en cuenta podriamos modificar el codigo anterior de la siguiente manera:

```html
<main>
  <p>El valor del contador es: <span data-state="counter"></span></p>
  <p>Aquí puedo volver a mostrar el contador: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  stateWrapper: document.querySelector('main')
})
```

Con este cambio, el estado se obtiene del elemento `main` en lugar del `document.body`. Esto permite eficientizar la busqueda de los elementos en un scop bien definido, en lugar de buscar en todo el body del documento. Por supuesto, en un archio con tan poco contenido en el DOM como el ejemplo anterior, esto no sería necesario. Sin embargo, si tenemos un archivo con muchos elementos puede ser útil especificar un `stateWrapper`.

> Nota: Si no se especifica un `stateWrapper`, el estado se obtiene del `document.body`.

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

<a style="display: block; text-align: right;" href="#vanilla-app-states">Volver a la selección de idiomas</a>

## Descripción

`vanilla-app-states` es un paquete que te permite manejar estados en tu aplicación web vanilla de manera fácil.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

## Instalación

Para instalar este paquete, ejecuta el siguiente comando en tu terminal:

```bash
npm install vanilla-app-states
```

Ahora crea un archivo de javascript que importe el paquete `AppState` que utilizaras para crear estados:

```javascript
import { AppState } from 'vanilla-app-states'
```

> Si quieres empezar a aprender como crear estados directamente puedes saltarte a la sección [creando un estado](#creando-un-estado)

Como estas realizando una importacion en este archivo, al agregar el script en tu archivo html, asegurate que especifiques que es de tipo `module`. Por ejemplo:

```html
<script type="module" src="./js/app.js"></script>
```

Además, a fin de tener acceso a los elementos del body desde el script debes asegurarte de que la etiqueta `<script>` que importe tu archivo de javascript esté justo despues de la etiqueta `<body>`. Por ejemplo:

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

Para crear un estado, simplemente debes crear una instancia de `AppState` y pasarle un identificador y un valor. Por ejemplo:

```javascript
import { AppState } from 'vanilla-app-states'

const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0
})
```

En este ejemplo, hemos creado un estado llamado `counterState` con el valor inicial de `0`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Accediendo a un estado

Para acceder a un estado, puedes llamar la funcion getter de la propiedad `stateCurrent` de la clase `AppState`. Por ejemplo:

```javascript
console.log(counterState.stateCurrent) // 0
```

En este ejemplo, hemos llamado a la función `console.log` y pasado el valor del estado `counterState.stateCurrent` que imprime el valor inicial de `0`.

> Nota: La propiedad stateCurrent es un getter, por lo que no se puede modificar directamente. Para actualizar el estado puedes leer la seccion [Actualizando un estado](#actualizando-un-estado).

> Nota: También puedes acceder al id del estado desde el getter `stateId` de la siguiente manera: `counterState.stateId`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Actualizando un estado

Para actualizar un estado, simplemente debes llamar a la función `updateState` de la instancia de la clase `AppState`. Por ejemplo:

```javascript
counterState.updateState(1)
```

> Nota: Si quieres actualizar el estado a un valor inicial, puedes llamar a la función `setInitialState` de la instancia de la clase `AppState` en lugar de establecer el valor inicial manualmente con `updateState`.

En este ejemplo, hemos llamado a la función `updateState` y pasado el nuevo valor `1`. Esto va a hacer lo siguiente:

1. Actualizar el estado.
2. Llamar la función `onStateChange` con el nuevo valor y el valor anterior. [mas información](#escuchando-cambios-en-un-estado)
3. Actualizar los elementos del DOM que utilicen el estado. [mas información](#utilizando-el-estado-en-el-dom)

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Escuchando cambios en un estado

Para escuchar cambios en un estado, simplemente debes pasar una funcion al parametro `onStateChange` del constructor de `AppState`. Por ejemplo:

```javascript
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  onStateChange: (newValue, oldValue) => {
    console.log(`El valor del contador es: ${newValue}`)
    console.log(`El valor del contador era: ${oldValue}`)
  }
})
```

En este ejemplo, hemos pasado una funcion que se ejecutará cuando el estado cambie. La funcion recibirá dos parámetros: `newValue` y `oldValue`. Estos parámetros representan el nuevo valor y el valor anterior del estado respectivamente.

> Nota: La funcion `onStateChange` es opcional. Si no se pasa, el estado igual sera actualizado tanto en el DOM como en la variable `stateCurrent`.

Por supuesto, esta funcion tambien puede ser extraída a fin de aumentar la legibilidad de tu código. Por ejemplo:

```javascript
const onCounterChange = (newValue, oldValue) => {
  console.log(`El valor del contador es: ${newValue}`)
  console.log(`El valor del contador era: ${oldValue}`)
}
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  onStateChange: onCounterChange
})
```

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Utilizando el estado en el DOM

Para utilizar el estado en el DOM, simplemente debes crear un elemento que tenga un atributo `data-state` con el identificador del estado. Por ejemplo:

```html
<p>El valor del contador es: <span data-state="counter"></span></p>
```

En este ejemplo, hemos creado un elemento `span` con un atributo `data-state` que tiene el valor `counter`. Dentro de el span con el `data-state` de `counter` (que es el identificador del estado), se mostrará el valor actual del estado, y cada vez que se actualice el estado, se actualizará el valor del span. Tambien la primera vez que se inicialice el estado al crear la instancia de la clase `AppState`, se mostrará su valor inicial en el span.

> Nota: esto solo funciona para los estados del tipo `string`, `number` y `bigint`. Si el estado es un booleano renderizara condicionalmente el elemento o elementos del DOM en los que se establezca el data-state con el id del estado.

> Para más información sobre el uso de un estado booleano puedes leer la subseccion [Estados booleanos](#estados-booleanos) dentro de la seccion Utilizando el estado en el DOM.

> Para más información sobre como renderizar estados de otros tipos que no sean `string`, `number`, `bigint` o `boolean` puedes leer la subseccion [Renderizando estados complejos](#renderizando-estados-complejos) dentro de la seccion Utilizando el estado en el DOM.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Estados booleanos

Si el estado es un booleano, los elementos en los que se aplique se renderizarán condicionalmente en función del valor del estado. Por ejemplo:

```javascript
const shouldShowParagraph = new AppState({
  stateId: 'shouldShowParagraph',
  stateInitial: true
})
```

```html
<p data-state="shouldShowParagraph">
  Este parrafo se renderizará condicionalmente en función del valor del estado
</p>
```

En este ejemplo, el parrafo con el `data-state` de `shouldShowParagraph` se renderizará si el estado `shouldShowParagraph` es `true`. Si el estado es `false`, el parrafo no se renderizará.

Por lo tanto, si cambiamos el valor del estado `shouldShowParagraph` a `false`, el parrafo no se renderizará en el DOM. Por ejemplo:

```javascript
shouldShowParagraph.updateState(false)
```

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>

### Renderizando estados complejos

Si el estado es un tipo complejo, como un `objeto` o un `arreglo` (de tipo `object`), puedes pasar una función al parámetro `onRender` del constructor de `AppState`. Esta función se ejecutará cada vez que el estado cambie y recibirá el nuevo estado como parámetro. El parametro `onRender` debe devolver un `string` que representará el contenido a insertar en el DOM en todos aquellos elementos donde el `data-state` corresponde al identificador del estado.

A continuación se muestra un ejemplo con un estado que es un arreglo de objetos para crear la funcionalidad de una lista de cosas por hacer:

```html
<!-- Aquí se crea el formulario para agregar cosas por hacer -->
<form id="addTodoForm">
  <input type="text" name="todo" placeholder="Escriba una cosa por hacer" />
  <button type="submit">Agregar</button>
</form>

<section data-state="todos">
  <!-- Aquí se renderizará el HTML retornado como template string de la función onRender -->
</section>
```

```javascript
const addTodoForm = document.getElementById('addTodoForm')
/* Aquí se crea el estado que maneja la lista de cosas por hacer */
const todos = new AppState({
  stateId: 'todos',
  stateInitial: [],
  onRender: (todos) => {
    const todosList = document.createElement('UL')
    todosList.innerHTML = todos.stateCurrent
      .map(
        (todo) => `
        <li>
          <span>${todo.text}</span>
          <button data-role="removeTodo" data-todo-id="${todo.id}">Borrar</button>
        </li>
        `
      )
      .join('')
    todoList.querySelectorAll('button[data-role="removeTodo"]').forEach((button) => {
      button.addEventListener('click', () => {
        todos.updateState([
          ...todos.stateCurrent.filter((todo) => todo.id !== button.getAttribute('data-todo-id'))
        ])
      })
    })
    return todosList.outerHTML
  }
})
/* Aquí se agregan cosas por hacer al estado todos */
addTodoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!addTodoForm.todo.value) return
  const todo = {
    id: crypto.randomUUID(),
    text: addTodoForm.todo.value
  }
  todos.updateState([...todos.stateCurrent, todo])
  addTodoForm.reset()
})
```

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
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0
})
```

En este ejemplo, hemos creado un estado llamado `counterState` con el valor inicial de `0`. Y asociamos dos elementos `span` del dom con el estado `counterState` utilizando el atributo `data-state`. Ahora cada vez que el counterState se actualice, se renderizará en ambos elementos `span`.

Inicialmente, al crear el estado se obtienen del DOM todos los elementos que tengan establecido el atributo `data-state` con el id del estado. Por defecto, los elementos se obtienen desde el `document.body`. Sin embargo, esto puede resultar ineficiente, en especial si el estado se renderiza en muchos elementos del DOM. Para evitar esto, cuando crees el estado puedes especificar un `stateWrapper` que será el elemento que se utilizará para obtener todos los elementos con un atributo `data-state` con el id del estado. Esto puede resultar especialmente útil si el estado se renderiza en varios elementos del DOM y todos estan dentro de un contenedor.

Teniendo esto en cuenta podriamos modificar el codigo anterior de la siguiente manera:

```html
<main>
  <p>El valor del contador es: <span data-state="counter"></span></p>
  <p>Aquí puedo volver a mostrar el contador: <span data-state="counter"></span></p>
</main>
```

```javascript
const counterState = new AppState({
  stateId: 'counter',
  stateInitial: 0,
  stateWrapper: document.querySelector('main')
})
```

Con este cambio, el estado se obtiene del elemento `main` en lugar del `document.body`. Esto permite eficientizar la busqueda de los elementos en un scop bien definido, en lugar de buscar en todo el body del documento. Por supuesto, en un archio con tan poco contenido en el DOM como el ejemplo anterior, esto no sería necesario. Sin embargo, si tenemos un archivo con muchos elementos puede ser útil especificar un `stateWrapper`.


> Nota: Si no se especifica un `stateWrapper`, el estado se obtiene del `document.body`.

<a style="display: block; text-align: right;" href="#🇪🇸-documentación-en-español">Volver al índice</a>
