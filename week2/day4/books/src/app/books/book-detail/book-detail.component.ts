import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input()
  book: Book;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService
  ) {}

  ngOnInit() {
    console.log('detail component');

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.bookService.getBook(id).subscribe(bookFromAPI => {
        console.log(bookFromAPI);

        this.book = bookFromAPI;
      });
    });

    // do this eventually
    // this.route.paramMap
    //   .pipe(
    //     map(params => params.get('id')),
    //     switchMap(id => this.bookService.getBook(id))
    //   )
    //   .subscribe(bookFromAPI => {
    //     console.log(bookFromAPI);
    //     this.book = bookFromAPI;
    //   });
  }
}
