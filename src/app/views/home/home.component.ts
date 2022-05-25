import { Component, OnInit } from '@angular/core';
import { QrCodeService } from 'src/app/service/qrCode.Serviceservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private qrCodeService : QrCodeService) { }

  ngOnInit(): void {
  }

}
