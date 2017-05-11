import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, TabsModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { AuthGuard } from '../_guards/index';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, canActivate: [AuthGuard], data: { roles: ['User'] } }
    ])
  ],
  declarations: [
    ProductListComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
