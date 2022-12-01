import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  constructor(private router:Router){

  }
  goToBookList(){
    this.router.navigateByUrl('books/list');
  }
}
