---
path: "/angular-components-i"
title: "Angular Components (part I)"
order: 5
---

<iframe src="https://docs.google.com/presentation/d/16IeBSmYrmhc3t_zGw-ec8hMp10U0D9N0SNOWZjBbH7M/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Angular Components (part I)

What we want to do in this chapter is get you to start thinking of the `@anuglar/cli` 
as the best and only way to create features in your angular app. The reason to think about it 
in that way is because the cli comes with sane defaults out of the box, and due to the fact that 
Angular is a framework components come with a fair bit of boilerplate code.

### Creating application features via the `@angular/cli`

Components are usually used for describing the parts of your UI. It is a common practice 
and it is based on atomic design. Most frameworks and libraries will use this method to construct 
UIs in a composable and more reusable manner. You could for example build a component library 
I am sure you are familiar with `bootstrap` or `material`. They also have variants for integrating 
with most popular frameworks like Angular and React.

To create a new component:

`npx ng generate component <component path>` or `npx ng g c <component path>`

In Angular services are used to communicate with APIs. The way you normally use a service is by 
injecting it into the components class that are designated to use this service.

To create a new service:

`npx ng generate service <service path>` or `npx ng g s <service path>`

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

### Individual exercises:

1) Create a directive for highlighting a piece of text

2) Create a pipe that will allow you to filter an array of strings

#### Hint: you should be able to build these featurettes simply by making use of the documentation on the angular website
