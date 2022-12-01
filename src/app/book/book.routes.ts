import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';


const routes : Route[] = [
    //Array of objects
    {
        path: '',
       // pathMatch: 'full', this tries to match full path i.e. books/list
        component:BookComponent,
        children: [
            {
                path: '',
                pathMatch:'full',//this adds the list to url path
                redirectTo:'list',
            },
            {
                path:'list',
                component:BookListComponent,
            },
            {
                path:'detail',
                component:BookDetailsComponent,
            }
        ]
        // children: [
        //     {
        //         path: 'list',
        //         component:BookListComponent,
        //     }
        //]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BookRoutingModule {}