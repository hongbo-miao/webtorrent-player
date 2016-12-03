import { Component } from '@angular/core';
import { PlayerService } from '../services/';

@Component({
  selector: 'my-player',
  template: `
    WebTorrent Player
    <my-video
      (setVideo)="onSetVideo($event)">
    </my-video>
    <my-controller
      [video]="playerService.video">
    </my-controller>
  `
})
export class PlayerComponent {
  constructor(
    private playerService: PlayerService
  ) {}

  private onSetVideo(video: any) {
    this.playerService.video = video;
  }
}
