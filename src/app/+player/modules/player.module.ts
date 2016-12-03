import { NgModule } from '@angular/core';

import {
  VideoComponent,
  ControllerComponent,
  UrlComponent,

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
    UrlComponent,

    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
