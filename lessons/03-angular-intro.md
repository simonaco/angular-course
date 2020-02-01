---
path: "/angular-intro"
title: "Angular Intro"
order: 2
---

<iframe src="https://docs.google.com/presentation/d/1ZkRvTG6lzR9ugkEg3-redoQJgeJdg3HRlfM9Amfb3xc/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

### TypeScript is a superset of JavaScript

To get started with typescript install it via `npm`

```bash
npm install typescript
```

You now have the typescript compiler available which allows you to convert `*.ts` files to `*.js`

Create a new file called `person.ts` and add this.

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

console.log(greeter(user))
```

Compile the file using `npx tsc person.ts`.
You will see there is a new file called `person.js`. Run this via `node person.js` and see that it outputs `Hello, Jane User`.

If you change the type of the user variable this will no longer work as greeter expects an argument of type string

```javascript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

console.log(greeter(user))
```

TypeScript allows you to define complex types as well and interfaces too. You can check out the [docs](https://www.typescriptlang.org/docs/handbook/basic-types.html) to see all the supported types. The benefit of using TypeScript is that you detect errors early in the dev process.

### Useful TS features for Angular

1) Namespaces

```typescript
// api.model.ts
namespace ApiModel {
    export interface Customer {
        id: number;
        name: string;
    }

    export interface User {
        id: number;
        isActive: boolean;
    }
}

// using interface
export class MyComponent {
    cust: ApiModel.Customer; 
}
```

2) Use type definition files so that you don't need to export the files

```typescript
// api.model.d.ts
// you don't need to export the interface in d file
interface Customer {
    id: number;
    name: string;
}
```

3) Making all properties optional

```typescript
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
```

4) Don't throw errors

```typescript
if (false) {
    // @ts-ignore
    console.log('x');
}
```

### RxJs is extremely powerful, and at the same time quite complicated

There are a lot of applications of reactive programming that go beyond Angular. RxJs is the JavaScript reactive programming 
extension. It is the standard library for reactive programming in JS.

RxJs is based of the observer pattern. It can be used both in NodeJS and the browser and can 
help you create very interesting functionalities in your UI.

### Eg: Long click  handler

```javacript
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$
  .pipe(
    mergeMap(event =>
      of(event).pipe(
        delay(700),
        takeUntil(mouseup$)
      )
    )
  )
  .subscribe(event => console.log('Long Press!', event));
```

### Eg: Only trap the most recent event(is useful for managing onchange events with API requests)

```javascript
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounce(() => interval(1000)));
result.subscribe(x => console.log(x));
```

RxJs comes with a variety of operators, these are not all used in Angular, and learning them all 
would be enough for another workshop however the RxJs [docs](https://rxjs-dev.firebaseapp.com/) 
should give you a one stop shop for trying out new things with reactive programming.

A few things to keep in mind about reactive programming
- everything is a stream
- operators are pure functions
- applications are: responsive, resilient, scalable and message-driven
- even if we are only touching on RxJs, Rx is a library that has multiple other language implementations

### Let's try getting our hands dirty with some code 🤔

### Exercises:
1) complete the following code with the required types and methods on the service
    - prerequisites: install axios `npm i axios tsc`
                     copy below code into myDogs.ts
    - hints:  you can find hints on how to define the types [here](https://medium.com/@rossbulat/advanced-typescript-by-example-api-service-manager-7ea591f5eba8)

```typescript
const axios = require('axios')

class APIService {
  _url: string = 'https://dog.ceo/api/breeds/list/all'
  _method: ApiMethod = 'GET'

  constructor() {}

  public setHeaders(headers: KeyValue<string, string>[]): APIService {}
  public setMethod(newMethod: ApiMethod): APIService {
    this._method = newMethod
    return this
  }

  retrieveDogs() {}
}

const api = new APIService()

api.retrieveDogs().then(data => console.log(data))
```

2) fetch a list of urls using RxJs Observables and operators
    - create a stream of observables from a list of urls
    - use the `ajax` util from `rxjs`
    - use a transform method to capitalize all the content from the response
    - use `mergeMap` to resolve all responses
    - BONUS: can you think of other fun applications?

```typescript
const { ajax } = require('rxjs/ajax');
const { of, from } = require('rxjs');
const { map, concatMap, mergeMap, catchError, take, retry, delay } = require('rxjs/operators');
const { XMLHttpRequest } = require('xmlhttprequest')

function* urlGenerator() {
  let idx = 0
  while(true) {
    yield `http://localhost:4242/books?_page=${idx}&_limit=10`
    idx += 1;
  }
}
const createXHR = () => new XMLHttpRequest()
<SOLUTION GOES HERE>
fetchUrl$.subscribe(data => console.log(data))
```

<!--const getData = url => {-->
  <!--return ajax({
    createXHR,
    url
  })-->
<!--}-->

<!--const urls$ = from(urlGenerator()).pipe(take(1))-->

<!--const fetchUrl$ = urls$.pipe(-->
  <!--retry(3),-->
  <!--mergeMap(url => getData(url)),-->
  <!--map(({ response }) => response.map(book => ({ ...book, languageCode: 'meh' }))),-->
  <!--catchError(error => {
    console.log('error: ', error);
    return of(error);-->
  <!--})-->
<!--)-->
