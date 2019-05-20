import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  @Input()
  book: Book;

  constructor() {}
}
