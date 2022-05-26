import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {  Component, OnInit } from '@angular/core';
import { QrCodeService } from 'src/app/qr-code.service';
import { qrCode } from 'src/app/qrCode';


@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css','./client-data.component.scss'],
})

export class ClientDataComponent implements OnInit{

  scanResult: any='';
  qrCode !: qrCode;

  ngOnInit(): void {
    this.getQrCodeById()
  }

  onCodeResult(result:string){
    this.scanResult=result;
  }

  constructor(private qrService : QrCodeService){
  }

  getQrCodeById(){
    return this.qrService.GetQrData("4").subscribe(resposta => {
      this.qrCode = resposta;
    })
  }
}  