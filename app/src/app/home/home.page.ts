import {Component} from '@angular/core';
import {Socket} from "ngx-socket-io"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public channelName: string = "aquele-canal";
  public isConnected: boolean = false;
  public showQRCode: boolean = false;
  public scannerEnabled: boolean = false;

  constructor(private socket: Socket) {
    this.socket.connect();

    this.socket.fromEvent("joined-channel").subscribe(data => {
      alert(data);
      this.isConnected = true;
      this.showQRCode = false;
    });

    this.socket.fromEvent("message").subscribe(data => {
      alert(data);
    });
  }

  createChannel() {
    this.scannerEnabled = false;
    this.channelName = new Date().getTime().toString();
    this.showQRCode = true;
    this.socket.emit("create-channel", this.channelName);
  }

  joinChannel() {
    this.showQRCode = false;
    this.scannerEnabled = true;
  }

  sendMessage() {
    this.socket.emit("send-message",
      {channel: this.channelName, text: "Mensagem " + Math.floor(Math.random() * 100)});
  }

  onScanSuccess(result: string) {
    this.scannerEnabled = false;
    this.channelName = result;
    this.socket.emit("join-channel", this.channelName);
  }

}
