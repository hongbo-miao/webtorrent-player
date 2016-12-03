import { NgModule } from '@angular/core';

import {
  ProgressControllerComponent,
  UrlComponent,
  VideoComponent,
  VolumeControllerComponent,

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
    ProgressControllerComponent,
    UrlComponent,
    VideoComponent,
    VolumeControllerComponent,

    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
