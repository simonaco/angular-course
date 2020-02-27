---
path: "/angular-components-iii"
title: "Angular Components (part III)"
order: 7
---

<iframe src="https://docs.google.com/presentation/d/1WGI33qAzGW59inh4D8_MXT9Kj6ffsRKHT7ZyH5fiFdk/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Using schematics to streamline component creation

To start on this chapter you can either work on your branch or
`git checkout 02-angular-components-search-box`

⚠️  If you get an error like:

```shell
Please commit your changes or stash them before you switch branches.
Aborting
```

run the following commands that will store your changes on the git stash

`git stash --include-untracked`

`git checkout 02-angular-components-search-box`


## Let's start

In the `@angular/cli` intro we added two schematics packages: `@angular/material` & `@angular/cdk`.
We will use these packages to make the book list look a bit more production ready and also add pagination
and actually create something that might be useful for a real life scenario.

### 1) Create the table using a material schematic

`npx ng generate @angular/material:table book-table`

### 2) Use the table component and pass in the books

```html
  <!-- in app.component.html -->
  <app-book-table
    [books]="(books | filterSearch: searchTitle)"
  >
  </app-book-table>
```

Change `book-table.component.ts` to use the prop passed in and update the data array when changes occur

```javascript
export class BookTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() books: Book[];
  ...
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['isbn13', 'originalTitle'];

  constructor() {
    this.dataSource = new BookTableDataSource([]);
  }

  ngOnInit() {
    this._refresh(this.books)
  }

  _refresh(books: Book[]) {
    this.dataSource.books = books
  }

  ngOnChanges(changes: SimpleChanges) {
    this._refresh([...changes.books.currentValue]);
  }

  // ...
}
```

We need to match the column names with the column data in the `book-table.component.html`

```html
    ...
    <ng-container matColumnDef="isbn13">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>ISBN13</th>
      <td mat-cell *matCellDef="let row">{{row.id}}</td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="originalTitle">
      <th mat-header-cell *matHeaderCellDef mat-sort-header>Original Title</th>
      <td mat-cell *matCellDef="let row">{{row.originalTitle}}</td>
    </ng-container>
    ...
```

### 3) We can notice that even though we filter the array properly the displayed data is not updated

In `book-table-datasource.ts` we want the set up the books array so that it is reative to changes.
Most of the code is auto-generated, but we want to update the type to be of type Book for the data array,
also the book array needs to be wrapped in an observable stream so that it reacts to changes.

```javascript
+export class BookTableDataSource extends DataSource<Book> {

+ private _dataStream = new BehaviorSubject<Book[]>([]);
+ public set books(v: Book[]) { this._dataStream.next(v); }
+ public get books(): Book[] { return this._dataStream.value; }

  paginator: MatPaginator;
  sort: MatSort;

+ constructor(books: Book[]) {
    super();
+    this.books = books;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
+  connect(): Observable<Book[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
+     this._dataStream,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
+     return this.getPagedData(this.getSortedData([...this.books]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
+ private getPagedData(data: Book[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
+ private getSortedData(data: Book[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
+       case 'originalTitle': return compare(a.originalTitle, b.originalTitle, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
```

### Individual tasks:

1) Update the table template to use the book model data, including the image url
