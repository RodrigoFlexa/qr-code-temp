import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {  Component, OnInit } from '@angular/core';
import { QrCodeService } from 'src/app/qr-code.service';
import { qrCode } from 'src/app/qrCode';
import { Utils } from 'src/app/utils/Utils';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css','./client-data.component.scss'],
})

export class ClientDataComponent implements OnInit{

  scanResult: any='';
  qrCode !: qrCode;
  utils !: Utils;
  
  ngOnInit(): void {
    this.qrCode = new qrCode();

    this.getQrCodeById();
  }

  onCodeResult(result:string){
    this.scanResult=result;
  }

  constructor(private qrService : QrCodeService){
  }
  

  trataDatas(dataA:string){
    let dataNova : string;
    let dataAntiga = dataA;
    let ano = dataAntiga.substring(0,4);
    let mes = dataAntiga.substring(4,6);
    let dia = dataAntiga.substring(6,8);
    let hora = dataAntiga.substring(8,10);
    let minutos = dataAntiga.substring(10,12);
    dataNova = dia + "/" + mes  + "/" + ano + " " + hora + ":" + minutos;
    return dataNova;
}

  getQrCodeById(){
    return this.qrService.GetQrData("4").subscribe(resposta => {
      this.qrCode.dataEntrada = this.trataDatas(resposta.dataEntrada);
      this.qrCode.dataPagamento = this.trataDatas(resposta.dataPagamento);
      this.qrCode.iD = resposta.iD;
      this.qrCode.lidoEntrada = resposta.lidoEntrada;
      this.qrCode.pago = resposta.pago;
      this.qrCode.retorno = resposta.retorno;
    })
  }
  
}  