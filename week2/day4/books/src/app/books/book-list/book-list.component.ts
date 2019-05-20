import { Component, OnInit } from '@angular/core';
import { Book } from '../../models';

import { BOOKS } from '../../data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = BOOKS;
  selectedBook: Book;

  constructor() {}

  ngOnInit() {}

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

    this.books.push(createdBook);
  }
}
