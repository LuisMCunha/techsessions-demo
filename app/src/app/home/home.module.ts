import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {environment} from '../../environments/environment';

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {QRCodeModule} from "angularx-qrcode"

const config: SocketIoConfig = {url: environment.serverURL};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SocketIoModule.forRoot(config),
    ZXingScannerModule,
    QRCodeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
