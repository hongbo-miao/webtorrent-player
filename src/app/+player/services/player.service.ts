import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as WebTorrent from 'webtorrent';
import * as _ from 'lodash';

import { prettyBytes } from '../../shared/lib/';

@Injectable()
export class PlayerService {
  video: any;
  torrent: any;

  loadVideo(url: string): Observable<void> {
    return Observable.create(observer => {
      const client = new WebTorrent();

      client.add(url, torrent => {
        this.torrent = torrent;

        torrent.files[0].renderTo(this.video);
        observer.next();
      });
    });
  }

  jumpTo(progress): Observable<number> {
    this.video.currentTime = progress / 1000 * this.video.duration;
    return Observable.of(progress);
  }

  updateInfo(): Observable<any> {
    if (!this.torrent || this.torrent.downloadSpeed === undefined) return Observable.empty();
    return Observable.of({
      downloadSpeed: prettyBytes(this.torrent.downloadSpeed) + '/s',
      uploadSpeed: prettyBytes(this.torrent.uploadSpeed) + '/s'
    });
  }

  updateProgress(): Observable<number> {
    if (!this.video) return Observable.of(0);

    const progress = this.video.currentTime / this.video.duration * 1000;

    if (_.isNaN(progress)) return Observable.of(0);

    return Observable.of(progress);
  }

  pause(pause: boolean): void {
    if (pause) this.video.pause();
    else this.video.play();
  }

  drift(seconds: number): void {
    this.video.currentTime += seconds;
  }

  toggleFullScreen(): void {
    if (!document.fullscreen && !document.webkitIsFullScreen && !document.mozFullScreen) {
      if (this.video.requestFullscreen) this.video.requestFullscreen();
      else if (this.video.webkitRequestFullscreen) this.video.webkitRequestFullscreen();
      else if (this.video.mozRequestFullScreen) this.video.mozRequestFullScreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
    }
  }
}
