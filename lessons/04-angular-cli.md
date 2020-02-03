---
path: "/angular-cli"
title: "Angular CLI"
order: 3
---

<iframe src="https://docs.google.com/presentation/d/1tq-M1JVgnzPaMWe2gz2Za6ikyiugM7JJeULxeE87MR0/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

### Angular CLI


The `cli` is a feature rich tool that helps you wire up all of your components so you should use it whenever it makes
sense. The best place to start learning how to use it is the documentation available [here](https://angular.io/cli)


In your workspace run:

`npm i @angular/cli`

🍕 All the most common dependencies of angular are under the `@angular` npm namespace

Create a new angular project:

`npx ng new ng-goodreads`

Add a third party dependency on `@angular/material`

`npx ng add @angular/material`

Add a third pardy dependency on `@angular/cdk`

`npx ng add @angular/cdk`

### Creating application features via the `@angular/cli`

Components are usually used for describing the parts of your UI. It is a common practice 
and it is based on atomic design. Most frameworks and libraries will use this method to construct 
UIs in a composable and more reusable manner. You could for example build a component library 
I am sure you are familiar with `bootstrap` or `material`. They also have variants for integrating 
with most popular frameworks like Angular and React.

To create a new component:

`npx ng generate component <component path>` or `npx ng g c <component path>`

To create a new service:

`npx ng generate service <service path>` or `npx ng g s <service path>`

To create a new directive:

`npx ng generate directive <directive path>` or `npx ng g d <directive path>`

To create a new module:

`npx ng generate module <module path>` or `npx ng g m <module path>`

#### Example 🌶️

`npx ng g c books` will generate a component in `src/app/books`. __Note__ that the component is nested in `app` so you don't need to specify the full path, `app/` is prefixed automatically
