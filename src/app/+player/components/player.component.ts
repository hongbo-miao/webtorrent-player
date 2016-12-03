import { Component } from '@angular/core';
import { PlayerService } from '../services/';

@Component({
  selector: 'my-player',
  template: `
    WebTorrent Player
    <my-url
      [url]="playerService.url"
      (changeUrl)="onChangeUrl($event)">
    </my-url>
    
    <div class="my-1"></div>
    
    <my-video
      [url]="playerService.url"
      (setVideo)="onSetVideo($event)">
    </my-video>
    
    <div class="my-1"></div>
    
    <my-controller
      [video]="playerService.video">
    </my-controller>
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
