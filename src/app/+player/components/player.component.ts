import { Component } from '@angular/core';
import { PlayerService } from '../services/';

@Component({
  selector: 'my-player',
  template: `
    WebTorrent Player

    <div class="row my-1">
      <my-url
        [url]="playerService.url"
        (changeUrl)="onChangeUrl($event)">
      </my-url>
    </div>

    <div class="row my-1">
      <my-video
        [url]="playerService.url"
        (setVideo)="onSetVideo($event)">
      </my-video>
    </div>

    <div class="row my-1">
      <div class="col-xs-8">
        <my-progress-controller
          [video]="playerService.video">
        </my-progress-controller>
      </div>

      <div class="col-xs-4">
        <my-volume-controller
          [video]="playerService.video">
        </my-volume-controller>
      </div>
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
