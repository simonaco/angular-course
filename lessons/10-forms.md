---
path: "/angular-forms"
title: "Angular Forms"
order: 9
---

<iframe src="https://docs.google.com/presentation/d/16FG_sNi3Cmxi-nrJAXJm0mF6lp0uwm4ltubP47mGTyw/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

# Forms

We will create our first form using our trusty `@angular/cli` with the builtin schematic from `@angular/material`

`npx ng g @angular/material:address-form edit`

We have our component now but no route to it so we want to create route in our `app-routing.module.ts` to `EditComponent`

```typescript
...
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  { path: "books", component: BooksComponent },
  { path: "edit/:id", component: EditComponent }, // -> this is an update url with id in the url
  { path: "edit/new", component: EditComponent }, // -> this is a create url, id is 'new'
  { path: "**", component: NotFoundComponent }
];
...
```

This command will output a general purpose address form component. The number of fields in the generated form is a little more than we
need so we want to remove the unused fields. In the end the markup we will be left with will be something like the following:

```html
<form [formGroup]="bookForm" novalidate (ngSubmit)="onSubmit()" [ngStyle]="{ 'width': '50rem' }">
  <mat-card class="shipping-card">
    <mat-card-header>
      <mat-card-title>Book Information</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="row">
        <mat-form-field class="full-width">
          <input matInput placeholder="Title" formControlName="originalTitle">
          <mat-error *ngIf="bookForm.controls['originalTitle'].hasError('required')">
            Title is <strong>required</strong>
          </mat-error>
        </mat-form-field>
      </div>
      <div class="row">
        <mat-form-field class="full-width">
          <input matInput placeholder="Authors" formControlName="authors">
          <mat-error *ngIf="bookForm.controls['authors'].hasError('required')">
            At least one author is <strong>required</strong>
          </mat-error>
        </mat-form-field>
      </div>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </mat-card-actions>
  </mat-card>
</form>
```

Now we have the component routed, next thing to do is extract the params from the URL, and use it to pre fill the form info

```typescript
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  id: string;
  currentBook: Book;
  submitDisabled: boolean = true;
  private sub: any;

  bookForm = this.fb.group({
    originalTitle: [null, Validators.required],
    authors: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.bookService.fetchBook(this.id).subscribe(
        data => {
          this.currentBook = data;
          this.bookForm.patchValue(this.currentBook)
        }
      );
    })
  }

  onSubmit() {
    const formValues = this.bookForm.value;
    this.bookService.updateBook(this.id, this.bookForm.value)
      .subscribe(_ => {
        console.log(`Successfully updated book with id: ${this.id}`)
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

In order to perform the updates and creates you need to implement the service methods that make the get book request
used when pre-filling the form with the existent book(edits) and the put request to update the entry.

```typescript
  fetchBook(bookId: string) {
    return this.http.get<Book>(`/api/books/${bookId}`, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  updateBook(bookId: string, book: Book) {
    return this.http.put<string>(`/api/books/${bookId}`, book, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
```

Now that you have pretty much built the underliying functionality you want to update the table so that the
action buttons route you to the form component

```html
<div class="mat-elevation-z8">
  <table mat-table class="full-width-table" matSort aria-label="Elements">
    <ng-container matColumnDef="edit">
      <th mat-header-cell *matHeaderCellDef>edit</th>
      <td mat-cell *matCellDef="let row">
        <a mat-icon-button [routerLink]="['/edit', row.id]">
          <mat-icon>edit</mat-icon>
        </a>
      </td>
    </ng-container>
    ...
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator #paginator
      [length]="dataSource?.books.length"
      [pageIndex]="0"
      [pageSize]="50"
      [pageSizeOptions]="[25, 50, 100, 250]">
  </mat-paginator>
</div>
```

### Individual tasks
1) Add routing from add book button to the edit form so that you can navigate to the edit component form and add new book items
2) Update the fields in the form so that you are able to enter all the data you have in a book item
3) Disable submit button unless form validates correctly
4) Add custom validation for: <br />
ISBN: exactly 9 chars in length <br />
ISBN13: exactly 13 chars in length <br />
__For fun__(custom validator): <br />
smallImageUrl: must be an url of an image
