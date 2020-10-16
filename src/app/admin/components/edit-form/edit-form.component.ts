import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }

    const edit_product = {
      'id' : 'p'+(this.productService.getAllProducts().length + 1),
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
  }

}
