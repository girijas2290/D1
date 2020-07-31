import { Component, OnInit } from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import { DashboardService } from 'src/app/UserDashboard/Maindashboard/dashboard.service';
import { combineLatest, BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, map, tap, startWith, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss']
})
export class MaindashboardComponent implements OnInit {

  chart:any;
  constructor(private dashboardservice:DashboardService) { }

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  selectedCategoryId=1;
  // Action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // Merge Data stream with Action stream
  // To filter to the selected category
  products$ = combineLatest([
    this.dashboardservice.invoicesWithproject$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId? product.id === selectedCategoryId : true
        )),
        shareReplay(1),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

    
    productsimplefilter$=this.dashboardservice.invoices$
            .pipe(map(products=>
              products.filter(product =>
                this.selectedCategoryId ? product.id === this.selectedCategoryId : true
              )                                    
            ),
            tap(data=>console.log(data),
            catchError(err=>
              this.errorMessage$=err)));
  // Categories for drop down list
  
  projectcategories$ = this.dashboardservice.projects$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  // Combine all streams for the view
  vm$ = combineLatest([
    this.products$,
    this.projectcategories$
  ])
    .pipe(
      map(([products, categories]) =>
        ({ products, categories })),
        tap(data=>console.log(data))
    );
 
    onSelected(categoryId: string): void {
      this.categorySelectedSubject.next(+categoryId);
    }
  

  ngOnInit() {

    new Chart("myChart", {
      type: 'line',
      data: {
          labels: ["Tokyo",	"Mumbai",	"Mexico City",	"Shanghai",	"Sao Paulo",	"New York",	"Karachi","Buenos Aires",	"Delhi","Moscow"],
          datasets: [{
              label: 'Series 1', // Name the series
              data: [500,	50,	2424,	14040,	14141,	4111,	4544,	7588,	5555, 6811], // Specify the data values array
              fill: true,
              borderColor: '#2196f3', // Add custom color border (Line)
              backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
              borderWidth: 1 // Specify bar border width
          },
                    {
              label: 'Series 2', // Name the series
              data: [1288,	88942,	44545,	7588,	99,	242,	1417,	5504,	14141, 5555], // Specify the data values array
              fill: true,
              borderColor: '#4CAF50', // Add custom color border (Line)
              backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
              borderWidth: 1 // Specify bar border width
          }]
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
      }
  });

  new Chart("line-chart", {
    type: 'line',
    data: {
      labels: [2010,2011,2012,2013,2014,2015,2016],
      datasets: [{ 
          data: [10,20,30,40,50,60,70],
          
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: [1,2,10,20,5,30,10,40],
          
          borderColor: "#8e5ea2",
          fill: false
        }, { 
          data: [1,5,10,20,25,30,10,60],
          
          borderColor: "#3cba9f",
          fill: false
        } 
      ]
    },
    options: {
      title: {
        display: false,
        
      }
    }
  });

  }

}
