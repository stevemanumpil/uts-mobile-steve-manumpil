import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailPage } from './product-detail.page';

const routes: Routes = [
  {
    path: ':productId',
    component: ProductDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailPageRoutingModule {}
