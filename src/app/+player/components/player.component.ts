import { Component } from '@angular/core';
import { PlayerService } from '../services/';

@Component({
  selector: 'my-player',
  template: `
    <div class="row my-1 flex-items-xs-center">
      <h1>WebTorrent Player</h1>
    </div>

    <div class="row my-1 flex-items-xs-center">
      <my-url
        [url]="playerService.url"
        (changeUrl)="onChangeUrl($event)">
      </my-url>
    </div>

    <div class="row my-2 flex-items-xs-center">
      <my-video
        [url]="playerService.url"
        (setVideo)="onSetVideo($event)">
      </my-video>
    </div>

    <div class="row my-1 flex-items-xs-center">
      <my-progress-controller
        [video]="playerService.video">
      </my-progress-controller>
    </div>
    
    <div class="row my-1">
      <div class="offset-xs-2 col-xs-8">
        <my-progress-slider
          [video]="playerService.video">
        </my-progress-slider>
      </div>

      <!--<div class="col-xs-3">-->
        <!--<my-volume-slider-->
          <!--[video]="playerService.video">-->
        <!--</my-volume-slider>-->
      <!--</div>-->
    </div>
  `
})
export class PlayerComponent {
  constructor(
    private playerService: PlayerService
  ) {}

  private onChangeUrl(url: string) {
    this.playerService.url = url;
  }

  private onSetVideo(video: any) {
    this.playerService.video = video;
  }
}
