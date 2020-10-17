import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/home/home.model';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  @Input() product: Product;
  
  constructor(
    private productService: HomeService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  async presentToast(model: string) {
    const toast = await this.toastCtrl.create({
      color: 'success',
      message: `${model} Berhasil Diedit!`,
      duration: 2000
    });
    toast.present();
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }

    const edit_product = {
      'id' : form.value.id,
      'foto' : form.value.foto,
      'jenis' : form.value.jenis,
      'model' : form.value.model,
      'harga' : form.value.harga,
      'stok' : form.value.stok,
      'merek' : form.value.merek
    }

    if(form.value.jenis == 'cpu'){
      edit_product['tambahan'] = {
        'base clock' : form.value.base_clock,
        'boost clock' : form.value.boost_clock,
        'core' : form.value.core,
        'thread' : form.value.thread
      }
    }
    else if(form.value.jenis == 'ram'){
      edit_product['tambahan'] = {
        'speed' : form.value.speed,
        'ukuran' : form.value.ukuran
      }
    }
    else if(form.value.jenis == 'mobo'){
      edit_product['tambahan'] = {
        'chipset' : form.value.chipset,
        'compatible brand' : form.value.compatibleBrand
      }
    }

    this.productService.editProduct(edit_product)
    this.modalCtrl.dismiss(null, 'cancel')
    this.presentToast(form.value.model)
  }

}
