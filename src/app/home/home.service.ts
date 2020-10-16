import { Injectable } from '@angular/core';
import { Product } from './home.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private products: Product[] = [
    {
      id: 'p1',
      foto: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//82/MTA-2183013/amd_amd-ryzen-7-2700x-processor--8-cores--3-7ghz--socket-am4-_full03.jpg',
      jenis: 'cpu',
      merek: 'AMD',
      model: 'Ryzen 7 4800H',
      harga: 4900000,
      stok: 5,
      tambahan: {
        "base clock" : 2.9,
        "boost clock" : 4.2,
        "core" : 8,
        "thread" : 16
      }
    },
    {
      id: 'p2',
      foto: 'https://www.amd.com/system/files/2019-11/238593-ryzen-9-pib-left-facing-1260x709_0.png',
      jenis: 'cpu',
      merek: 'AMD',
      model: 'Ryzen 9 3900X',
      harga: 9550000,
      stok: 3,
      tambahan: {
        "base clock" : 3.8,
        "boost clock" : 4.6,
        "core" : 12,
        "thread" : 24
      }
    },
    {
      id: 'p3',
      foto: 'https://media.kingston.com/hyperx/features/hx-features-memory-fury-ddr4-rgb.jpg',
      jenis: 'ram',
      merek: 'HyperX',
      model: 'FURY DDR4 RGB',
      harga: 1290000,
      stok: 12,
      tambahan: {
        "speed" : 3200,
        "ukuran" : 32
      }
    },
    {
      id: 'p4',
      foto: 'https://images-na.ssl-images-amazon.com/images/I/71ejpWvp38L._AC_SL1200_.jpg',
      jenis: 'mobo',
      merek: 'ASRock',
      model: 'B450M-HDV',
      harga: 1560000,
      stok: 7,
      tambahan: {
        "chipset" : 'AMD Promontory B450',
        "compatible brand" : 'AMD'
      }
    },
    {
      id: 'p5',
      foto: 'https://images-na.ssl-images-amazon.com/images/I/81SgMxWZBvL._AC_SL1500_.jpg',
      jenis: 'mobo',
      merek: 'ASUS',
      model: 'ROG STRIX B450-F GAMING',
      harga: 2710000,
      stok: 2,
      tambahan: {
        "chipset" : 'AMD B450',
        "compatible brand" : 'AMD'
      }
    },
    {
      id: 'p6',
      foto: 'https://www.klikgalaxy.com/image-product/img22193-1594372524.jpg',
      jenis: 'mobo',
      merek: 'MSI',
      model: 'MAG B460M MORTAR',
      harga: 2450000,
      stok: 9,
      tambahan: {
        "chipset" : 'Intel® B460 Chipset',
        "compatible brand" : 'Intel'
      }
    },
    {
      id: 'p7',
      foto: 'https://d2ih5qgee2kfcl.cloudfront.net/content/2020/09/04/AqsbZPo/t_5f52eee4725b2_700.jpg',
      jenis: 'gpu',
      merek: 'Nvidia',
      model: 'GeForce RTX 3080',
      harga: 12000000,
      stok: 1,
    },
    {
      id: 'p8',
      foto: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/6/23/9311179/9311179_20dd2495-b3de-442b-9921-f3a915cc8979_1024_1024',
      jenis: 'gpu',
      merek: 'AMD',
      model: 'Radeon RX 5600 XT',
      harga: 6340000,
      stok: 5,
    },
  ]
  private counter: number = this.products.length
  constructor() { }

  getAllProducts(){
    return [...this.products];
  }

  getProduct(productId: string){
    return {...this.products.find(product => {
      return product.id === productId;
    })};
  }

  getCounter(){
    return this.counter
  }

  setCounter(count: number){
    this.counter+=count
  }

  addProduct(product: Product){
    this.products.push(product)
  }

  deleteProduct(productId: string){
    this.products = this.products.filter( product => {
      return product.id !== productId
    })
  }

  editProduct(editProduct: Product){
    this.products.find( product => {
      if(product.id === editProduct.id){
        product.foto = editProduct.foto;
        product.harga = editProduct.harga;
        product.jenis = editProduct.jenis;
        product.merek = editProduct.merek;
        product.model = editProduct.model;
        product.stok = editProduct.stok;
        if(product.jenis == 'cpu'){
          product.tambahan['base clock'] = editProduct.tambahan['base clock'];
          product.tambahan['boost clock'] = editProduct.tambahan['boost clock'];
          product.tambahan['core'] = editProduct.tambahan['core'];
          product.tambahan['thread'] = editProduct.tambahan['thread'];
        }
        else if(product.jenis == 'ram'){
          product.tambahan['speed'] = editProduct.tambahan['speed'];
          product.tambahan['ukuran'] = editProduct.tambahan['ukuran'];
        }
        else if(product.jenis == 'mobo'){
          product.tambahan['chipset'] = editProduct.tambahan['chipset'];
          product.tambahan['compatible brand'] = editProduct.tambahan['compatible brand'];
        }
      }
    })
  }
}
