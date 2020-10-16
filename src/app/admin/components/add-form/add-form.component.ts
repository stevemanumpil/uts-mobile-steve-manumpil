import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {

  defaultjenis: string='cpu'
  
  constructor(
    private productService: HomeService,
    private modalCtrl: ModalController
  ) { }
  
  
  ngOnInit() {}

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }

    const new_product = {
      'id' : 'p'+(this.productService.getAllProducts().length + 1),
      'foto' : form.value.foto,
      'jenis' : form.value.jenis,
      'model' : form.value.model,
      'harga' : form.value.harga,
      'stok' : form.value.stok,
      'merek' : form.value.merek
    }

    if(form.value.jenis == 'cpu'){
      new_product['tambahan'] = {
        'base clock' : form.value.base_clock,
        'boost clock' : form.value.boost_clock,
        'core' : form.value.core,
        'thread' : form.value.thread
      }
    }
    else if(form.value.jenis == 'ram'){
      new_product['tambahan'] = {
        'speed' : form.value.speed,
        'ukuran' : form.value.ukuran
      }
    }
    else if(form.value.jenis == 'mobo'){
      new_product['tambahan'] = {
        'chipset' : form.value.chipset,
        'compatible brand' : form.value.compatibleBrand
      }
    }

    this.productService.addProduct(new_product)
    this.modalCtrl.dismiss(null, 'cancel')
  }

}
