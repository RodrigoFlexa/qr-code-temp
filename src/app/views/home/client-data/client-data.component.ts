import {  Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewEncapsulation} from '@angular/core';
import { LogService } from 'src/app/service/log-service.service';
import { OperationResponse } from 'src/app/model/OperationResponse';
import { Appointment } from 'src/app/model/Appointment.model';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ClientDataComponent {
  public scannerEnabled: boolean = true;
  public transports: Transport[] = [];
  public information: string = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";

  constructor(public logService: LogService, public cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    const appointment = new Appointment($event);

    this.logService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      });
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

}
interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}