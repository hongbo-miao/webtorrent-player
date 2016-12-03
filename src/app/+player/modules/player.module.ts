import { NgModule } from '@angular/core';

import {
  VideoComponent,
  ControllerComponent,
  // HangUpComponent,

  PlayerComponent
} from '../components/';
import { PlayerService } from '../services/';

import { SharedModule } from '../../shared/modules/';
import { PlayerRoutingModule } from './';

@NgModule({
  imports: [
    SharedModule,
    PlayerRoutingModule
  ],
  declarations: [
    VideoComponent,
    ControllerComponent,
    // HangUpComponent,

    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
