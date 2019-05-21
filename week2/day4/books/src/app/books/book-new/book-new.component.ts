import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Book } from '../../models';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent implements OnInit {
  book = new Book();

  @Output()
  createBook = new EventEmitter<Book>();

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('submitting form', this.book);

    // push book from form/book instance to books
    // this.books.push(this.book);
    this.bookService.createBook(this.book).subscribe(createdBook => {
      console.log('created Book', createdBook);

      // this is pretty much a redirect
      this.router.navigateByUrl('/');
    });
    // this.createBook.emit(this.book);

    // no longer refers to the book we just created
    this.book = new Book();

    form.reset();

    // console.log(this.books);
  }
}
