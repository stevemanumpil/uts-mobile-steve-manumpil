import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/home/home.model';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() title: string;
  @Input() product: Product;

  constructor(
    private modalCtrl: ModalController,
    private productService: HomeService
  ) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel')
  }
}
