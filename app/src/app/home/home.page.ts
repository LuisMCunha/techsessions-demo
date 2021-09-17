import {Component} from '@angular/core';
import {Socket} from "ngx-socket-io"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public userName: string = "";
  public channelName: string = "";
  public message: string = "";
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

    this.socket.fromEvent("message").subscribe((message: any) => {
      alert(message.userName + " says: " + message.text);
    });
  }

  toggleCreate() {
    this.scannerEnabled = false;
    this.showQRCode = true;
    this.createChannel();
  }

  createChannel(channelName?: string) {
    this.channelName = channelName ? channelName : "Aquele-canal-" + new Date().getTime().toString();
    this.socket.emit("create-channel", this.channelName);
  }

  toggleJoin() {
    this.showQRCode = false;
    this.scannerEnabled = true;
  }

  onScanSuccess(result: string) {
    this.joinChannel(result);
  }

  joinChannel(channelName) {
    this.scannerEnabled = false;
    this.channelName = channelName;

    this.socket.emit("join-channel", {
      userName: this.getUserName(),
      name: this.channelName
    });

  }

  getUserName() {
    if (!this.userName) this.userName = "anonymous-" + Math.floor(Math.random() * 1000);
    return this.userName;
  }

  sendMessage(keyEvent?) {
    if (keyEvent && (keyEvent.key !== 'Enter' || keyEvent.code !== 'Enter' || keyEvent.charCode !== 13)) {
      return;
    }
    this.socket.emit("send-message", {
      channel: this.channelName,
      userName: this.getUserName(),
      text: this.message
    });
    this.message = "";
  }

}
