import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ClientDataComponent } from './views/home/client-data/client-data.component';

const routes: Routes = [
  
  { path: 'cliente/:id' , component : ClientDataComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
