import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as WebTorrent from 'webtorrent';
import * as _ from 'lodash';

@Injectable()
export class PlayerService {
  video: any;
  torrent: any;

  checkCompatibility(): Observable<boolean> {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    return Observable.of(!!window.RTCPeerConnection);
  }

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
    if (!this.torrent) return Observable.of({ downloadSpeed: 0, uploadSpeed: 0 });

    const downloadSpeed = !this.torrent.downloadSpeed ? 0 : this.torrent.downloadSpeed;
    const uploadSpeed = !this.torrent.uploadSpeed ? 0 : this.torrent.uploadSpeed;

    return Observable.of({ downloadSpeed, uploadSpeed });
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
