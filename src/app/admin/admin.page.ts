import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController, ModalController, ToastController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
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
              this.presentLoading().then(() => {
                this.deleteItem(product.id)
                this.router.navigate(['/home'])
                this.presentToast()
              })
            }
          }
        ]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Menghapus Produk...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      color: 'warning',
      message: 'Produk dihapus!',
      duration: 2000
    });
    toast.present();
  }

  deleteItem(productId: string){
    this.productService.deleteProduct(productId)
  }

  async editItem(product: Product, slidingItem: IonItemSliding){
    await slidingItem.close()
    this.presentModal('Edit Produk',product);
  }
}
