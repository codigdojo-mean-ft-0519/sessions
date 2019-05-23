import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookNewComponent } from './books/book-new/book-new.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';

import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookNewComponent,
    BookDetailComponent,
    NavComponent,
    NotFoundComponent,
    BookEditComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
