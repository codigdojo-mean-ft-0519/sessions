import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    // const self = this;

    // this.bookService.getBooks().subscribe(function(books) {
    //   console.log('es5');
    //   console.log(books);
    //   console.log(this);
    //   console.log(self);
    //   this.books = books;
    // });

    this.bookService.getBooks().subscribe(books => {
      console.log('es6');
      console.log(books);
      console.log(this);
      this.books = books;
    });
  }

  onClick(clickedBook: Book) {
    console.log('selected clickedBook', clickedBook);
    //                            (expression)             ? (if true) : (if false);
    this.selectedBook = this.selectedBook === clickedBook ? null : clickedBook;

    // if (this.selectedBook === clickedBook) {
    //   this.selectedBook = null;
    // } else {
    //   this.selectedBook = clickedBook;
    // }
  }

  onCreate(createdBook: Book) {
    console.log('creating book', createdBook);

    this.bookService.createBook(createdBook).subscribe(apiBook => {
      console.log(apiBook);
      this.books.push(apiBook);
      // spread pattern
      // this.books = [...this.books, apiBook];
    });
  }

  onEvent(event: Event) {
    event.stopPropagation();
    console.log('eventing');
  }

  onDelete(bookId: number) {
    console.log('deleting book', bookId);

    this.bookService.removeBook(bookId).subscribe(deletedBook => {
      console.log('deleted', deletedBook);

      this.books = this.books.filter(
        bookFromArray => bookFromArray._id !== deletedBook._id
      );

      console.log('this books filtered', this.books);
    });
  }
}
