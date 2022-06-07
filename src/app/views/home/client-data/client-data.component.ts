import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QrCodeService } from 'src/app/qr-code.service';
import { qrCode } from 'src/app/qrCode';


import { ActivatedRoute } from '@angular/router';


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
    // qrCode !: qrCode;
    qrCode : any;
    iD !: string; 

    //Agora
    public agora =  new Date();
    public horaAgora = this.agora.getHours();
    public minutoAgora = this.agora.getMinutes();

    //dadosEntrada
    public horaEntrada !: number;
    public minutoEntrada !: number;
    public dataEntrada = new Date();

    //timer
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;
    private timer: any;
    private date = new Date();
  
  constructor(public qrService : QrCodeService ,  private activatedRoute: ActivatedRoute){
  }

  async ngOnInit(): Promise<void> {
    const par : string =  this.activatedRoute.snapshot.paramMap.get('id') as string;
   
    this.iD  =  par;
    this.qrCode = {};
    
    await this.getQrCodeById(this.iD);

    console.log(this.qrCode);

    this.horaEntrada = this.getHoras(this.qrCode.dataEntrada);
    this.minutoEntrada = this.getMinutos(this.qrCode.dataEntrada);    
    this.diferenca();
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

  async getQrCodeById(MeuId: string){
    let resposta : any = await this.qrService.GetQrData(MeuId).then()
      this.qrCode.dataEntrada = this.trataDatas(resposta.dataEntrada);
      this.qrCode.dataPagamento = this.trataDatas(resposta.dataPagamento);
      this.qrCode.iD = resposta.iD;
      this.qrCode.lidoEntrada = resposta.lidoEntrada;
      this.qrCode.pago = resposta.pago;
      this.qrCode.retorno = resposta.retorno;
      console.log(this.qrCode);
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

  getHoras(dataA:string) : number {
    let horas = parseInt(dataA.substring(11,13));
    return horas;
  }

  getMinutos(dataA:string) : number {
    let minutos = parseInt(dataA.substring(14,16));
    return minutos;
  }

  diferenca(){
    this.dataEntrada.setHours(this.getHoras(this.qrCode.dataEntrada));
    this.dataEntrada.setMinutes(this.getMinutos(this.qrCode.dataEntrada));
    console.log(this.dataEntrada);
    console.log(this.agora);

    let diff = Math.abs(this.agora.getTime() - this.dataEntrada.getTime());
    
    let diffMin = diff / 1000 / 60 ;
   
    let horas = 0 
    let minutos = 0;

    if(diffMin < 60){
      this.hours = 0;
      this.minutes = diffMin;
    }
    else if(diffMin > 60){
      while(diffMin > 60){
        diffMin = diffMin - 60;
        horas = horas + 1;
      }
      this.hours = horas;
      this.minutes = diffMin;
    }else{
      this.hours = 1;
      this.minutes = 0;
    }
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

      this.updateTimer();

      if(this.seconds >= 0){
        this.timer = setInterval(() => {this.updateTimer();} , 1000);
      }     
    }
  }
}