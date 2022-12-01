import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookRoutingModule } from './book.routes';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    BookComponent,
    BookListComponent,
    BookDetailsComponent,
    BookCardComponent

  ],
  //imports means this module has dependency on this module
  imports: [
    CommonModule,
    BookRoutingModule,
    MatCardModule,
    MatButtonModule
    ]
})
export class BookModule { }
