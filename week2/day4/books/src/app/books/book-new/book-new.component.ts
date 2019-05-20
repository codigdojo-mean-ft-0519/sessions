import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Book } from '../../models';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent implements OnInit {
  book = new Book();

  @Output()
  createBook = new EventEmitter<Book>();

  constructor() {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('submitting form', this.book);

    // push book from form/book instance to books
    // this.books.push(this.book);
    this.createBook.emit(this.book);

    // no longer refers to the book we just created
    this.book = new Book();

    form.reset();

    // console.log(this.books);
  }
}
