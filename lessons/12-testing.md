---
path: "/angular-testing"
title: "Angular Testing"
order: 11
---

<iframe src="https://docs.google.com/presentation/d/1-lfVdJXJ2NwgXoDxd-Xo3_gqvXVOJW1iHdt_E80bPMo/embed?start=false&loop=false&delayms=30000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


To start on this chapter you can either work on your branch or
`git checkout 06-forms`

⚠️  If you get an error like:

```shell
Please commit your changes or stash them before you switch branches.
Aborting
```

run the following commands that will store your changes on the git stash

`git stash --include-untracked`

`git checkout 06-forms`


## Let's start

We don't require to jump through any hoops to get the testing set-up. Like with most features
the `@angular/cli` sets up pretty much everything when it creates the project so we are pretty much good.

Whenever we generate a new component using `@angular/cli` it will also create a `.spec.ts` file which is
the extension that you regularly have for tests.

We'll start with the simpler tests, the ones that don't require extra dependencies. A good place to start
are pipes. Let's look at the code and write a few tests to test the `transform` method in the pipe.

```typescript
import { FilterSearchPipe } from './filter-search.pipe';

describe('FilterSearchPipe', () => {
  let searchPipe: FilterSearchPipe;

  beforeEach(() => {
    searchPipe = new FilterSearchPipe();
  });

  it('create an instance', () => {
    expect(searchPipe).toBeTruthy();
  });

  it('returns empty list if list is not defined', () => {
    expect(searchPipe.transform(undefined, 'test')).toEqual([]);
  });
});
```

Moving on to the more interesting test cases, with mocks and services:

```typescript
import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http";

import { Book } from "../shared/book.model";
import { BookService } from "./book.service";
import { of, throwError, Observable } from "rxjs";

const fixture: Book[] = [
  {
    id: "9780439023480",
    ISBN: "439023483",
    ISBN13: "9780439023480",
    authors: "Suzanne Collins",
    originalTitle: "The Hunger Games",
    originalPublicationYear: 2008,
    averageRating: 4.34,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
  },
  {
    id: "9780439554930",
    ISBN: "439554934",
    ISBN13: "9780439554930",
    authors: "J.K. Rowling, Mary GrandPré",
    originalTitle: "Harry Potter and the Philosopher's Stone",
    originalPublicationYear: 1997,
    averageRating: 4.44,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1474154022s/3.jpg"
  },
  {
    id: "9780316015840",
    ISBN: "316015849",
    ISBN13: "9780316015840",
    authors: "Stephenie Meyer",
    originalTitle: "Twilight",
    originalPublicationYear: 2005,
    averageRating: 3.57,
    languageCode: "en-US",
    smallImageUrl: "https://images.gr-assets.com/books/1361039443s/41865.jpg"
  },
  {
    id: "9780061120080",
    ISBN: "61120081",
    ISBN13: "9780061120080",
    authors: "Harper Lee",
    originalTitle: "To Kill a Mockingbird",
    originalPublicationYear: 1960,
    averageRating: 4.25,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1361975680s/2657.jpg"
  },
  {
    id: "9780743273560",
    ISBN: "743273567",
    ISBN13: "9780743273560",
    authors: "F. Scott Fitzgerald",
    originalTitle: "The Great Gatsby",
    originalPublicationYear: 1925,
    averageRating: 3.89,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1490528560s/4671.jpg"
  },
  {
    id: "9780525478810",
    ISBN: "525478817",
    ISBN13: "9780525478810",
    authors: "John Green",
    originalTitle: "The Fault in Our Stars",
    originalPublicationYear: 2012,
    averageRating: 4.26,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1360206420s/11870085.jpg"
  }
];

describe("BookServiceService", () => {
  let service: BookService;
  let httpClientSpy: {
    get: jasmine.Spy,
    put: jasmine.Spy,
    post: jasmine.Spy,
    delete: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    service = new BookService(<any> httpClientSpy);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch a list of books", () => {
    httpClientSpy.get.and.returnValue(of(fixture));

    service.fetchBooks().subscribe(data => expect(data).toEqual(fixture), fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
```

What we are testing here is that the correct methods are called when calling specific methods of the service API.
We use spy objects for creating mocks that give us mock methods like `calls`, `toHaveBeenCalledWith`, `toHaveBeenCalled`.
Mocks come with a big range of utils that allow you to check the calls to the mocked methods. Documenting every last feature
of mocks is out of scope but you should go out and check articles on mocking. Library features vary but the concepts are
the same so knowledge should be fairly transferable regardless of the library.

The final part in our testing journey will be setting up components using `TestBed` and creating components along with the dependencies.

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FilterSearchPipe } from '../shared/filter-search.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from '../search-box/search-box.component';
import { BooksComponent } from './books.component';
import { BookTableComponent } from '../book-table/book-table.component';
import { Book } from '../shared/book.model';
import { BookService } from '../services/book.service';
import { of, throwError, Observable } from "rxjs";

const fixtureBooks: Book[] = [
  {
    id: "9780439023480",
    ISBN: "439023483",
    ISBN13: "9780439023480",
    authors: "Suzanne Collins",
    originalTitle: "The Hunger Games",
    originalPublicationYear: 2008,
    averageRating: 4.34,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
  },
  {
    id: "9780439554930",
    ISBN: "439554934",
    ISBN13: "9780439554930",
    authors: "J.K. Rowling, Mary GrandPré",
    originalTitle: "Harry Potter and the Philosopher's Stone",
    originalPublicationYear: 1997,
    averageRating: 4.44,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1474154022s/3.jpg"
  },
  {
    id: "9780316015840",
    ISBN: "316015849",
    ISBN13: "9780316015840",
    authors: "Stephenie Meyer",
    originalTitle: "Twilight",
    originalPublicationYear: 2005,
    averageRating: 3.57,
    languageCode: "en-US",
    smallImageUrl: "https://images.gr-assets.com/books/1361039443s/41865.jpg"
  },
  {
    id: "9780061120080",
    ISBN: "61120081",
    ISBN13: "9780061120080",
    authors: "Harper Lee",
    originalTitle: "To Kill a Mockingbird",
    originalPublicationYear: 1960,
    averageRating: 4.25,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1361975680s/2657.jpg"
  },
  {
    id: "9780743273560",
    ISBN: "743273567",
    ISBN13: "9780743273560",
    authors: "F. Scott Fitzgerald",
    originalTitle: "The Great Gatsby",
    originalPublicationYear: 1925,
    averageRating: 3.89,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1490528560s/4671.jpg"
  },
  {
    id: "9780525478810",
    ISBN: "525478817",
    ISBN13: "9780525478810",
    authors: "John Green",
    originalTitle: "The Fault in Our Stars",
    originalPublicationYear: 2012,
    averageRating: 4.26,
    languageCode: "eng",
    smallImageUrl: "https://images.gr-assets.com/books/1360206420s/11870085.jpg"
  }
];

fdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent, BookTableComponent, SearchBoxComponent, FilterSearchPipe ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    bookService = TestBed.get(BookService);
    spyOn(bookService, 'fetchBooks').and.returnValue(of(fixtureBooks));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

In order to create a component you need to bring in all dependencies the component requires to be able to render
itself. This is not a lot of fun when you're not writing tests as you write your code. Figuring out what is required
will show up as warnings when running tests.
For example if a component tag is not recognized then you will get a warning about it so you should probably include
imports array, or if your own component in the declarations array.


### Individual tasks
1) Add test to `src/app/shared/filter-search.pipe.spec.ts` to increase coverage to 100%
2) Add a coverage threshold in the `karma.conf.json` [hint](https://angular.io/guide/testing#code-coverage-enforcement)
3) Add tests for `src/app/services/book.service.ts` for `post`, `put`, `delete`
