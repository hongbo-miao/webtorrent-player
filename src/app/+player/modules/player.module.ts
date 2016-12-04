import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import {
  FullScreenComponent,
  ProgressControllerComponent,
  ProgressSliderComponent,
  UrlComponent,
  VideoComponent,
  VolumeSliderComponent,

  PlayerComponent
} from '../components/';
import { PlayerService } from '../services/';
import { PlayerEffects } from '../effects/';

import { SharedModule } from '../../shared/modules/';
import { PlayerRoutingModule } from './';

@NgModule({
  imports: [
    SharedModule,

    PlayerRoutingModule,

    EffectsModule.run(PlayerEffects)
  ],
  declarations: [
    FullScreenComponent,
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
