import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Book } from '../../models';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.bookService.getBook(id))
      )
      .subscribe(bookFromAPI => {
        console.log(bookFromAPI);
        this.book = bookFromAPI;
      });
  }

  onUpdate(event: Event, form: NgForm) {
    event.preventDefault();

    const { valid, value: book }: { value: Book; valid: boolean } = form;

    if (valid) {
      this.bookService.updateBook(book).subscribe(() => {
        this.router.navigateByUrl('books');
      });
    }
  }
}
