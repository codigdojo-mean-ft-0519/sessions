import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookNewComponent } from './books/book-new/book-new.component';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { HomeComponent } from './home/home.component';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'books',
    // /books
    children: [
      {
        path: '',
        component: BookListComponent,
      },
      // /books/books/new
      {
        path: 'new',
        component: BookNewComponent,
      },
      // /books/18
      {
        path: ':id',
        component: BookDetailComponent,
      },
      {
        path: ':id/edit',
        component: BookEditComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'books',
    pathMatch: 'full',
    // component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
