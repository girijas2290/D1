import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';
import { Invoice } from './Invoice';
import { Project } from './Project';
import { Issue } from './Issue';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  

  private invoiceUrl = 'http://127.0.0.1:3000/api/v1/invoices';
  private projectUrl = 'http://127.0.0.1:3000/api/v1/products';
  private issueUrl='http://127.0.0.1:3000/api/v1/issues';
  

  // All invoice products
  invoices$ = this.http.get<Invoice[]>(this.invoiceUrl)
    .pipe(
      tap(data => console.log('Invoices', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError),
      
    );

    projects$ = this.http.get<Project[]>(this.projectUrl)
    .pipe(
      tap(data => console.log('Projects', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError),
      
    );

    issues$ = this.http.get<Issue[]>(this.issueUrl)
    .pipe(
      tap(data => console.log('Issues', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError),
      
    );
    
  // Combine products with categories
  // Map to the revised shape.
  invoicesWithproject$ = combineLatest([
    this.invoices$,
    this.projects$
  ]).pipe(
    map(([invoice, project]) =>
      invoice.map(product => ({
        ...product,
        price: product.totalamount * 1.5,
        project: project.find(c => product.id === c.id).projectname,
      }) as Invoice)
    ),
    shareReplay(1)
  );

  // Action stream for product selection
  // Default to 0 for no product
  // Must have a default so the stream emits at least once.
  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  // Currently selected product
  // Used in both List and Detail pages,
  // so use the shareReply to share it with any component that uses it
  selectedProduct$ = combineLatest([
    this.invoicesWithproject$,
    this.productSelectedAction$
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find(product => product.id === selectedProductId)
    ),
    tap(product => console.log('selectedProduct', product)),
    shareReplay(1)
  );

  // Suppliers for the selected product
  // Finds suppliers from download of all suppliers
  // Add a catchError so that the display appears
  // even if the suppliers cannot be retrieved.
  // Note that it must return an empty array and not EMPTY
  // or the stream will complete.

  // Suppliers for the selected product
  // Only gets the suppliers it needs
  /*
    Allows adding of products to the Observable
  */

  // Action Stream
  private productInsertedSubject = new Subject<Project>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();

  // Merge the streams
  productsWithAdd$ = merge(
    this.invoicesWithproject$,
    this.productInsertedAction$
  )
    .pipe(
      scan((acc: Project[], value: Project) => [...acc, value]),
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );

  constructor(private http: HttpClient) { }

  
  // Change the selected product
  selectedProductChanged(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
