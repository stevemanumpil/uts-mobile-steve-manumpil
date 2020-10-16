import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { Product } from '../home/home.model';
import { HomeService } from '../home/home.service';
import { ModalPage } from './components/modal/modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  products: Product[]
  constructor(
    private productService: HomeService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.productService.getAllProducts()
  }

  ionViewWillEnter(){
    this.products = this.productService.getAllProducts()
  }
  async presentModal(title, product=null) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'title' : title,
        'product' : product
      }
    });
    
    modal.onDidDismiss().then(() => this.products = this.productService.getAllProducts())
    return await modal.present();
  }

  async deleteAlert(product: Product){
    const alert = await this.alertCtrl.create({
        header: 'Hapus Produk',
        message: `Yakin ingin menghapus ${product.model}?`,
        buttons: [
          {
            text: 'Batal',
            role: 'cancel'
          }, 
          {
            text: 'Hapus',
            handler: () => {
              this.deleteItem(product.id)
              this.router.navigate(['/home'])
            }
          }
        ]
    });

    await alert.present();
  }

  deleteItem(productId: string){
    this.productService.deleteProduct(productId)
  }

  async editItem(product: Product, slidingItem: IonItemSliding){
    await slidingItem.close()
    this.presentModal('Edit Produk',product);
  }
}
