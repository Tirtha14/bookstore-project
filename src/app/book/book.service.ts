import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) {}

    /**
     * Creating function get resturns an observable so observable is used
     * Gets all book categories
     * its return type is object so observable is resolved to an object
     * @returns Observable<Object>
     */
    getBookCategories():Observable<Object>{
      const GET_CATEGORIES_URL =
      'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=Xq9tud1zbDZEckdrmHAmdth8QSGrrHT6'
      
      return this.http.get(GET_CATEGORIES_URL);
    }

    /**
     * Get best selling books by category
     * @param categoryName category name for which book you want
     * @param date date for which you want the books 'YYYY-MM-DD | 'current'
     * @returns Observable<string>
     */
    getBooksByCategory(categoryName:string, date='current'):Observable<Object>{
      const GET_BOOKS_BY_CATEGORY_URL = `https://api.nytimes.com/svc/books/v3/lists/${date}/${categoryName}.json?api-key=Xq9tud1zbDZEckdrmHAmdth8QSGrrHT6`;
      return this.http.get(GET_BOOKS_BY_CATEGORY_URL);
    }
   
}
