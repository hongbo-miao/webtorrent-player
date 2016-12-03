import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class PlayerService {
  // url: string = '';
  url: string = 'https://webtorrent.io/torrents/sintel.torrent';
  // url: string = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

  video: any;

  progress: number = 0;

  changeProgress() {
    if (!this.video) return;

    const progress  = this.video.currentTime / this.video.duration * 1000;

    if (_.isNaN(progress)) return;

    this.progress = progress;
  }
}
