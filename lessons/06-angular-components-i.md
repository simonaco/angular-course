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

The template 
### Individual exercises:

1) Create a pipe that will allow you to filter an array of strings


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
