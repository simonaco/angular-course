---
path: "/angular-routing"
title: "Angular Routing"
order: 9
---

<iframe src="https://docs.google.com/presentation/d/1S0oeGdqfWH1t5h-3kF7fG3PL4Ys3zqoDgNEk4F4Ei78/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


To start on this chapter you can either work on your branch or
`git checkout 04-angular-services`

⚠️  If you get an error like:

```shell
Please commit your changes or stash them before you switch branches.
Aborting
```

run the following commands that will store your changes on the git stash

`git stash --include-untracked`

`git checkout 04-angular-services`


## Let's start

Until now we have used a single page to display the data, but now we also want to introduce
a form for editing (TBD), so we want to move the main page into its own component and use the
app component as an app shell instead.

## First step
We want to move the main parts we have been working with so far into a listing component which we will call `books`
We should generate the component using our friendly `@angular/cli`

`npx ng g c books`

Once done we can move the markup that deals with rendering the book table to the `books.component.html`

```html
<app-search-box (searchFired)="doSearch($event)"></app-search-box>
<app-book-table
  [books]="(books | filterSearch: searchTitle)"
  (editFired)="doEdit($event)"
  (deleteFired)="doDelete($event)"
  (addFired)="doAdd()"
>
</app-book-table>
```

At the same time we want to move the functionality from the original component class, the event handlers and the lifecycle methods

```javascript
export class BooksComponent implements OnInit {
  searchTitle: string = '';
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  getBooks() {
    this.bookService
      .fetchBooks()
      .subscribe((books) => {
        this.books = books;
      })
  }

  ngOnInit(): void {
    this.getBooks()
  }

  doSearch(search: Search) {
    this.searchTitle = search.searchTerm;
  }

  doAdd() {
    console.log('Adding book');
  }

  doDelete(bookId: string) {
    console.log(bookId);
    this.bookService
      .deleteBook(bookId)
      .subscribe(data => {
        this.getBooks();
      })
  }

  doEdit(bookId: string) {
    console.log(bookId);
  }
}
```

Afterwards we should probably fix the imports to get them working

## Second step

Add the mapping to the new component in your `app-routing.module.ts`

```javascript
const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  { path: "books", component: BooksComponent },
];
```

## Third step
Move the `<router-outlet></router-outlet>` where the old component used to be in order to inherit the same
styles you had on your old component. Like we said earlier the main app component will be more of an app shell,
or app wrapper that gives us the theme that is uniform across the application.

## Individual tasks:
1) Create a Not Found component and wire up the routing in the routing module
2) Because we have two routes pointing to the same resource we will get unexpected navigation results. For example when navigating to `/books` we
will get the `books.json` from the api. This is not what we intended so we want to fix it. What I would recommend is that you create a prefix on the
api routes using the `--routes` param in the `json-server` package ([hint](https://github.com/typicode/json-server#add-custom-routes)). This is another
symptom of the difference between SPA routing and server side routing.
