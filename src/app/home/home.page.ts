import { Component, OnInit } from '@angular/core';
import { Product } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[]
  isGridChange: boolean = false;
  gridIcon: string = "grid";
  constructor(private productService: HomeService) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts().filter( item => {
      return item.stok > 0;
    })
  }

  ionViewWillEnter(){
    this.products = this.productService.getAllProducts().filter( item => {
      return item.stok > 0;
    })
  }

  changeGrid(){
    this.isGridChange = !this.isGridChange;
    !this.isGridChange ? this.gridIcon = 'grid' : this.gridIcon = 'list';
  }
}
