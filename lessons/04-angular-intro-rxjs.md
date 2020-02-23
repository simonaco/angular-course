---
path: "/angular-intro-rxjs"
title: "Angular Intro RxJs"
order: 3
---

<iframe src="https://docs.google.com/presentation/d/13FXIGYriWiH5lUtvSCnbem4nDtK7jH5o8ZGGKC7kgNs/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

### RxJs is extremely powerful, and at the same time quite complicated

There are a lot of applications of reactive programming that go beyond Angular. RxJs is the JavaScript reactive programming 
extension. It is the standard library for reactive programming in JS.

RxJs is based of the observer pattern. It can be used both in NodeJS and the browser and can 
help you create very interesting functionalities in your UI.

### Eg: Long click  handler

```javascript
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

1) fetch a list of urls using RxJs Observables and operators
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
  const urls = [<list_of_urls>];
  while(true) {
    yield urls[idx];
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

