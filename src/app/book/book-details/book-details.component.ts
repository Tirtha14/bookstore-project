import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
book:any;
constructor(){

}
ngOnInit():void{
  this.book = JSON.parse(localStorage.getItem('selectedBook')!);
  console.log(this.book);
}
}
