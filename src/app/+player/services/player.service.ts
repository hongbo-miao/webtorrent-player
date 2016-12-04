import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as WebTorrent from 'webtorrent';
import * as _ from 'lodash';

@Injectable()
export class PlayerService {
  video: any;

  loadVideo(url: string): Observable<void> {
    return Observable.create(observer => {
      const client = new WebTorrent();

      client.add(url, torrent => {
        torrent.files[0].renderTo(this.video);
        observer.next();
      });
    });
  }

  jumpTo(progress): Observable<number> {
    this.video.currentTime = progress / 1000 * this.video.duration;
    return Observable.of(progress);
  }

  updateProgress(): Observable<number> {
    if (!this.video) return Observable.of(0);

    const progress = this.video.currentTime / this.video.duration * 1000;

    if (_.isNaN(progress)) return Observable.of(0);

    return Observable.of(progress);
  }

  play(): void {
    this.video.play();
  }

  pause(): void {
    this.video.pause();
  }

  drift(seconds: number): void {
    this.video.currentTime += seconds;
  }
}
