import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerComponent } from '../components/';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PlayerComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerRoutingModule { }
