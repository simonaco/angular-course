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

The `@angular/cli` provides you with a very straightforward way to create a new project. It has multiple options that 
you can use for customizing your project creation and how the command would be run.
Create a new angular project:

1) basic command

`npx ng new ng-goodreads`

2) as a dry run (check out what will be created)

`npx ng new ng-goodreads --dry-run`

3) without installing the prerequisites in the project folder

`npx ng new ng-goodreads --skip-install`

4) defining custom selectors that are unique in our project for the app (we can define multiple apps in the same project)

`npx ng new ng-goodreads --prefix books`

5) 💫 NEW in Angular 8+ 💫 . Angular 8 allows you to use the last generation rendering engine **_IVY_**

`npx ng new ng-goodreads --enable-ivy`


### And of course like any command line tool it allows you to combine the options

A common set of command line flags that you may use could look something like this:

`npx ng new ng-goodreads —-routing —-prefix books —-style scss —-dry-run`

Something nice about the `@angular/cli` is that it also comes with an interactive prompt that lets you set 
some of the options

## 2 Other cool and useful features
## provided by the `@angular/cli` are the `build` and `serve` commands

### 1) `npx ng build` - docs [here](https://angular.io/cli/build)

- Mode flag

`npx ng build --prod`

![dev_v_prod](./images/dev_v_prod.png)

- optimized build - _This should be used with caution as it is 2x the time of a regular build_

`npx ng build --build-omtimizer`

- output vendor chunks (separate bundles for third party dependecies)

`npx ng build --vendor-chunk`

- for some bundle analysis you could use `--statsJson` (eg: `webpack-bundle-analyzer`)

`npx ng build --statsJson`


### 2) `npx ng serve` - runs your app in dev mode with hot reloading


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
