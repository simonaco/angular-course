---
path: "/angular-services"
title: "Angular Services"
order: 7
---

<iframe src="https://docs.google.com/presentation/d/1nFc4ARtR5oJ-BpIk33Py7Yvn-o5CbfXteODspFtpF90/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

# Services

To start on this chapter you can either work on your branch or
`git checkout 03-angular-components-book-table`

⚠️  If you get an error like:

```shell
Please commit your changes or stash them before you switch branches.
Aborting
```

run the following commands that will store your changes on the git stash

`git stash --include-untracked`

`git checkout 03-angular-components-book-table`


## Let's start

We want to add a service for fetching the books from the JSON server API and loading it into the `app.component`
for display. The way we do that in angular is via the `HttpClient` from `@angular/common/http`. We need to include
it in the app module so it's available for injecting into the components.

```javascript
...
import { HttpClientModule } from '@angular/common/http';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We then want to generate a service feature in our goodreads app that will become the wrapper for interacting with the
JSON api exposed by the `json-server`

```bash
npx ng generate service services/book
```

We want to update the npm scripts to start both the UI and the `json-server`. We can use the `npm-run-all` to start
them in paralel. In the `package.json` we want to update the scripts section to have a client and a server script for
running them both when we run `npm start`.

First install the `npm-run-all` package

`npm i npm-run-all`

the update `package.json`

```json
  ...
  "scripts": {
    "ng": "ng",
    "start": "npm-run-all --parallel client server",
    "server": "npx json-server server/books.json --config server/server-config.json",
    "client": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  ...
```

We also need to configure the angular UI to proxy requests to the api when we make a request. There are
two things we need to do:
- create a `proxy.conf.json` in the root with content describing the url of the API, something like the following:

```json
{
  "/books": {
    "target": "http://localhost:4242",
    "secure": false
  }
}
```
- update `angular.json` to use the newly created `proxy.conf.json`. This makes it use the fake API when
running in dev, production would work properly with the specified environment as described [here](https://angular.io/guide/build#using-environment-specific-variables-in-your-app)

```json
        ...
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "ng-goodreads:build",
+           "proxyConfig": "proxy.conf.json"
          },
          "configurations": {
            "production": {
              "browserTarget": "ng-goodreads:build:production"
            }
          }
        },
        ...
```

Now we have a way of running both the API and the client angular app as part of the same npm script
which is really useful as now you have an app that is close to production levels but not using a real
API.

### Next step: build the service utils in order to fetch data from the API

The generated file `src/app/services/book.service.ts` is the main feature we will be working on in this chapter
we can define the various operations we are allowed to perform on the API. As a nice to have we have added an
errorHandler and a few operators that will make the requests more resilient.

```javascript
import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from '../shared/book.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  fetchBooks() {
    return this.http.get<Book[]>('/books', httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }
}
```

After we are done with that we can make use of the `fetchBooks` api we defined in the service

```javascript
...
import { BookService } from "./services/book.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "ng-goodreads";
  searchTitle: string = "";
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService
      .fetchBooks()
      .subscribe((books) => {
        this.books = books;
      })
  }

  ...
}
```

### Individual tasks:
1) Add `edit`, `delete` and `add` buttons to the UI that handle click events (console.log(event) will do).
This is an example of how you would add a button with a material icon to your table template.

```html
<button mat-raised-button color="primary" (click)="onAddBook()">
  <mat-icon>add</mat-icon>
  Add Book
</button>
```
The events should be passed from the app component as we should only inject the service in the top
level component so you should make use of `@Output` to pass on the events to the parent component via `EventEmitter`

2) Implement `delete` functionality using the service and `HttpClient`
