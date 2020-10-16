import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  loadedProduct: Product
  additionalSpec: string[]
  showProduct: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: HomeService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      if(!paramMap.has('productId')){ return; }
      const productId = paramMap.get('productId');
      this.loadedProduct = this.productService.getProduct(productId);
      
      this.showProduct = {
        'foto' : this.loadedProduct.foto,
        'model' : this.loadedProduct.model,
        'merek' : this.loadedProduct.merek,
        'harga' : this.loadedProduct.harga,
        'stok' : this.loadedProduct.stok
      }

      if(this.loadedProduct.jenis == 'cpu'){
        this.showProduct['tambahan'] = {
          'Base Clock' : `${this.loadedProduct.tambahan['base clock']} GHz`,
          'Boost Clock' : `${this.loadedProduct.tambahan['boost clock']} GHz`,
          'Core' : this.loadedProduct.tambahan['core'],
          'Thread' : this.loadedProduct.tambahan['thread'],
        }
      }
      else if(this.loadedProduct.jenis == 'ram'){
        this.showProduct['tambahan'] = {
          'Speed' : `${this.loadedProduct.tambahan['speed']} MHz`,
          'Ukuran' : `${this.loadedProduct.tambahan['ukuran']} GB`,
        }
      }
      else if(this.loadedProduct.jenis == 'mobo'){
        this.showProduct['tambahan'] = {
          'Chipset' : this.loadedProduct.tambahan['chipset'],
          'Compatible Brand' : this.loadedProduct.tambahan['compatible brand']
        }
      }
      else{
        this.showProduct['tambahan'] = {}
      }

      this.additionalSpec = Object.keys(this.showProduct['tambahan'])
    })
  }
}
