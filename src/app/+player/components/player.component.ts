import { Component, OnInit } from '@angular/core';

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

    <div class="row flex-items-xs-center">
      <my-progress-controller
        [video]="playerService.video">
      </my-progress-controller>
    </div>
    
    <div class="row">
      <div class="offset-xs-2 col-xs-8">
        <my-progress-slider
          [video]="playerService.video"
          [progress]="playerService.progress"
          (changeProgress)="onChangeProgress($event)">
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
export class PlayerComponent implements OnInit {
  constructor(
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    // const url = 'https://webtorrent.io/torrents/sintel.torrent';
    const url = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

    this.playerService.loadVideo(url);

    setInterval(() => {
      this.playerService.changeProgress();
    }, 1000);
  }

  private onChangeUrl(url: string) {
    this.playerService.loadVideo(url);
  }

  private onSetVideo(video: any) {
    this.playerService.video = video;
  }

  private onChangeProgress(progress: number) {
    this.playerService.video.currentTime = progress;
  }
}
