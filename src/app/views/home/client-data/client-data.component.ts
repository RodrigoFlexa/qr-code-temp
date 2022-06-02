import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QrCodeService } from 'src/app/qr-code.service';
import { qrCode } from 'src/app/qrCode';


import { ActivatedRoute } from '@angular/router';
import { cron } from 'src/app/utils/cron';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css','./client-data.component.scss'],
})

export class ClientDataComponent implements OnInit{

  @ViewChild("idAudio") idAudio!: ElementRef ;
  
  //scanner
  scanResult: any='';

  //qr code API data get
  qrCode !: qrCode;
  iD !: string; 

  //timer
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  private timer: any;
  private date = new Date();
  
  public show: boolean = true;
  public disabled: boolean = false;
  public animate: boolean = false;

  constructor(private qrService : QrCodeService ,  private activatedRoute: ActivatedRoute){
  }


  ngOnInit(): void {
    const par : string =  this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.iD  =  par;
    this.qrCode = new qrCode();
    this.getQrCodeById(this.iD);
    this.start();
  }
  //Resultado do scaneamento
  onCodeResult(result:string){
    this.scanResult = result;
    if(this.scanResult.charAt(0) == 'h'){
      return this.qrService.liberaCatraca(this.scanResult,this.qrCode.iD).subscribe(resposta => {
        this.qrCode.retorno  = resposta.retorno;
        ;
      });
    }else{
      return 0;
    }
  }

  getQrCodeById(MeuId: string){
    return this.qrService.GetQrData(MeuId).subscribe(resposta => {
      this.qrCode.dataEntrada = this.trataDatas(resposta.dataEntrada);
      this.qrCode.dataPagamento = this.trataDatas(resposta.dataPagamento);
      this.qrCode.iD = resposta.iD;
      this.qrCode.lidoEntrada = resposta.lidoEntrada;
      this.qrCode.pago = resposta.pago;
      this.qrCode.retorno = resposta.retorno;
    })
  }

  pagar(){
    alert("Pagamento realizado com sucesso para o ID:" + this.qrCode.iD + "! \n" + "Dirija-se para a aba de saída")
    return this.qrService.Pagar(this.qrCode.iD).subscribe(resposta => {
    });
  }
  //utils da página **************************************************************************************

  //tratamento de datas vindas da API

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



//timer:

  updateTimer() {
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time + 1000);  //---

    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    }
  start() {
    if (this.hours >= 0 || this.minutes >= 0 || this.seconds >= 0) {

      this.disabled = true;
      this.show = false;  //hide btn + and -
      this.updateTimer();

      if(this.seconds >= 0){
        this.timer = setInterval(() => {this.updateTimer();} , 1000);
      }     
    }
  }
  stop() {    
    this.disabled = false;
    this.show = true;
    this.animate = false;
    clearInterval(this.timer);
    this.idAudio.nativeElement.load();
  }
}

  