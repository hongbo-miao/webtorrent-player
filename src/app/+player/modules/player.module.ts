import { NgModule } from '@angular/core';

import {
  ProgressControllerComponent,
  ProgressSliderComponent,
  UrlComponent,
  VideoComponent,
  VolumeSliderComponent,

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
    ProgressSliderComponent,
    UrlComponent,
    VideoComponent,
    VolumeSliderComponent,

    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
