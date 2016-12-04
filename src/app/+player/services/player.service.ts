import { Injectable } from '@angular/core';
import * as WebTorrent from 'webtorrent';
import * as _ from 'lodash';

@Injectable()
export class PlayerService {
  url: string;
  video: any;
  progress: number = 0;

  loadVideo(url: string) {
    this.url = url;

    const client = new WebTorrent();

    client.add(url, torrent => {
      torrent.files[0].renderTo(this.video);
    });
  }

  changeProgress() {
    if (!this.video) return;

    const progress  = this.video.currentTime / this.video.duration * 1000;

    if (_.isNaN(progress)) return;

    this.progress = progress;
  }
}
