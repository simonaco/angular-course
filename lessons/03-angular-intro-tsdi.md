---
path: "/angular-intro-typescript"
title: "Angular Intro TypeScript"
order: 2
---

<iframe src="https://docs.google.com/presentation/d/1Zqh2Y14t4xnqqla4M1kyR4LAmseJwiP7a0109K_rp88/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

### TypeScript is a superset of JavaScript

To get started with typescript install it via `npm`

```shell
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

2) Use type definition files so that you don't need to export the types

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

### Let's try getting our hands dirty with some code 🤔

### Exercises:
1) complete the following code with the required types and methods on the service
    - prerequisites: install axios `npm i axios typescript`
                     copy below code into myDogs.ts
    - hints:  you can find an example on how to define the types [here](https://medium.com/@rossbulat/advanced-typescript-by-example-api-service-manager-7ea591f5eba8)

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
