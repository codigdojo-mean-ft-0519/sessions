import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookNewComponent } from './books/book-new/book-new.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

@NgModule({
  declarations: [AppComponent, BookListComponent, BookNewComponent, BookDetailComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
