---
path: "/angular-components-i"
title: "Angular Components (part I)"
order: 5
---

<iframe src="https://docs.google.com/presentation/d/16IeBSmYrmhc3t_zGw-ec8hMp10U0D9N0SNOWZjBbH7M/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Angular Components (part I)

To start on this chapter you can either work on your branch or
`git checkout 01-angular-components`

⚠️  If you get an error like:

```shell
Please commit your changes or stash them before you switch branches.
Aborting
```

run the following commands that will store your changes on the git stash

`git stash --include-untracked`

`git checkout 01-angular-components`


## Let's start
What we want to do in this chapter is get you to start thinking of the `@anuglar/cli`
as the best and only way to create features in your angular app. The reason to think about it
in that way is because the cli comes with sane defaults out of the box, and due to the fact that
Angular is a framework components come with a fair bit of boilerplate code.

We added `@angular/material` and created our first angular app. We should probably start building some
basic html elements and wiring them into the app.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-goodreads';
  searchTitle: string = ''; // <- add searchTitle member
}
```

The template will contain quite a lot of markup, however it will be fairly simple to add other html elements.
In order to have our elements styled nicely this is where you want to add your new markup:

```html
  <!-- Add your stuff here -->
  <!-- Add your stuff here -->
  <svg id="clouds" alt="Gray Clouds Background" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
    <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"/>
  </svg>

</div>

<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * * The content above * * * * * * * * * * * -->
<!-- * * * * * * * * * * is only a placeholder * * * * * * * * * * -->
<!-- * * * * * * * * * * and can be replaced. * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
<!-- * * * * * * * * * * End of Placeholder * * * * * * * * * * * -->
<!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * -->
```

### 1) Expression interpolation:

Adding something like `<p>{{searchTitle}}</p>` in your markup

The `{{}}` notation causes to render the evaluated value of the enclosed expression.

```typescript
  <p>{{searchTitle}}</p> <!-- renders component.searchTitle -->
  <p>{{2 + 2}}</p> <!-- renders 4 -->
  <p>{{[1, 2, 3, 4]}}</p> <!-- renders 1, 2, 3, 4 -->
```

### 2) Property binding:

```typescript
<img [src]="<some-image-url>" />
```
### 3) Event binding:

```typescript
<input (input)="onChange($event)" />
<input (input)="onChange($event.target.value)" />
<button (click)="onClick()">What does this button do?</button>
```

For more complex objects, an array of objects for example the template engine will mke the
best attempt to interpolate but usually it would render as `[object Object],[object Object]...`

### 4) Grabbing references to html elements

In `src/app.component.ts`:

```typescript
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-goodreads';
  searchTitle: string = '';

  setText(value: string) {
    this.searchTitle = value;
  }
}
```

In `src/app.component.html`:

```html
  ...
  <input #refInput type="text"  />
  <button (click)="setText(refInput.value)">Add something</button>
  <p>{{ searchTitle }}</p>

  <svg id="clouds" alt="Gray Clouds Background" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
    <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"/>
  </svg>

</div>
```

### Individual exercises:

1) Have a play round with the existing data bindings with the list of existing events and attributes,

   💡_*You could for example set the input value based on a value inside the component class*_💡

   💡_*Or create a list in the `src/app.component.ts` class that adds items you write in the input*_💡
2) Create a pipe in the path `shared/search-filter` that will allow you to filter an array of strings


### Fine print: guide on what and where to use components, directives, pipes and modules
### TLDR: Creating application features via the `@angular/cli`

Components are usually used for describing the parts of your UI. It is a common practice
and it is based on atomic design. Most frameworks and libraries will use this method to construct
UIs in a composable and more reusable manner. You could for example build a component library
I am sure you are familiar with `bootstrap` or `material`. They also have variants for integrating
with most popular frameworks like Angular and React.

To create a new component:

`npx ng generate component <component path>` or `npx ng g c <component path>`

Directives are used to add a generic attribute that can be reused in across your components. Angular
comes with several builtin directives such as `*ngFor`, `*ngIf` (structural) and `ngStyle`, `ngClass`
(attribute). The directives that are builtin should be enough to acommodate most use cases, but in the
cases where you find yourself duplicating too much code between components perhaps it is time to write
a custom one 🤔.

To create a new directive:

`npx ng generate directive <directive path>` or `npx ng g d <directive path>`

Pipes are functions that help you transform the data bound attributes in your components, the most common
use case being filtering or sorting.

To create a new pipe:

`npx ng generate pipe <pipe path>` or `npx ng g p <pipe path>`

Once you start working on a medium to large application you will want to split your app into multiple
modules so that you have more reusable parts in your app that you can move to other projects.

To create a new module:

`npx ng generate module <module path>` or `npx ng g m <module path>`

In our generated app there is an extra module for routing `src/app-routing.module.ts`
