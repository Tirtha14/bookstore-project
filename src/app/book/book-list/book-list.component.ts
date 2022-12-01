import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Book, BookCategory } from 'src/app/models';
import { BookService } from '../book.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  bookCategories: BookCategory[] = [];

  selectedBookCategory:any;
  // books=[1,2,3,4,5,6,7,8,9];
  //array of books and not string it will throw error
  // books: Book[] = [
  //   {
  //     title: 'Harry 1',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  //   A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting..`,
  //     author: 'J.K.Rowling',
  //     price: 100,
  //     buyLink: 'https://material.angular.io/guide/theming',
  //     imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //   },
  //   {
  //     title: 'Harry 4',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  //   A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting..`,
  //     author: 'J.K.Rowling',
  //     price: 100,
  //     buyLink: '',
  //     imageUrl: '',
  //   },
  //   {
  //     title: 'Harry 3',
  //     description: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  //   A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting..`,
  //     author: 'J.K.Rowling',
  //     price: 100,
  //     buyLink: '',
  //     imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
  //   },
  // ]
  books:Book[] =[];

  /**Using dependency injection */
  constructor(private bookService: BookService,
    private route:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchBookCategories();
  }

  fetchBookCategories() {
    console.log('inside fetch')

    /**inside subscribe use object */
    this.bookService
      .getBookCategories()
      .pipe(
        map((response) => {
          console.log('response', response);
          return this.getTransformedCategories(response);
        })
      )
      .subscribe({
        next: (categories: BookCategory[]) => {
          console.log('transformed response', categories);
          this.bookCategories = categories;
          this.onCategorySelected(this.bookCategories[0]);
        },
        error: (error) => { console.log(error) }
      });
  }
  getTransformedCategories(categoryResponse: any) {

    const bookCategories: BookCategory[] = [];
    // this is a js map that works on array and gives new array
    const transformedCategories = categoryResponse.results.map((category: any) => {
      const newCategory:BookCategory = {
        title: category.list_name,
        categoryId: category.list_name_encoded,
      };
      return newCategory;

    });
    return transformedCategories;
  }

  onCategorySelected(category: BookCategory){
    this.selectedBookCategory = category;
    console.log(this.selectedBookCategory);
    this.fetchBooksByCategory();
  }

  fetchBooksByCategory(){

    console.log('fetchbookby category called');
    this.bookService.getBooksByCategory(this.selectedBookCategory.categoryId)
    .pipe(
      map((response):Book[]=>{
      return this.getTransformedBooks(response);
    })
    )
    .subscribe({
      next: (books: Book[]) => {
        console.log(books);
        this.books = books;
       // this.bookCategories = categories;
        
      },
      error:(error) => {
        console.log(error);
      },
    });
  }

  getTransformedBooks(booksResponse:any): Book[]{
    return booksResponse.results.books.map((book:any)=>{
      const newBook: Book ={
        title: book.title,
        description: book.description,
        author: book.author,
        price: Number(book.price),
        buyLink: book.amazon_product_url,
        imageUrl: book.book_image,
      };
      return newBook;
    });
  }
  goToBookDetailView(book:Book){
    console.log(this.selectedBookCategory);
    localStorage.setItem('selectedBook',JSON.stringify(book));
    this.route.navigate(['../detail'], { relativeTo: this.activatedRoute
    });
  }

}
