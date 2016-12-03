import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as WebTorrent from 'webtorrent';

@Component({
  selector: 'app-root',
  styles: [`
    video {
      width: 100%;
    }
  `],
  template: `
    WebTorrent Player
    <video #video>
    </video>
    
    <div>{{vol}}</div>
    <button (click)="onVolUp()">+</button>
    <button (click)="onVolDown()">-</button>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('video') private videoEl: ElementRef;
  video: any;
  vol: number = 0;

  ngAfterViewInit() {
    this.video = this.videoEl.nativeElement;
    this.vol = this.video.volume;

    // const torrentId = 'https://webtorrent.io/torrents/sintel.torrent';
    const torrentId = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

    const client = new WebTorrent();
    console.log('client', client);

    client.add(torrentId, torrent => {
      console.log('torrent.files', torrent.files);

      torrent.files[0].renderTo(this.video);
    });
  }

  onVolUp() {
    this.setVol(.1);
  }

  onVolDown() {
    this.setVol(-.1);
  }

  setVol(value) {
    let vol = this.video.volume;
    vol += value;

    //  test for range 0 - 1 to avoid exceptions
    if (vol >= 0 && vol <= 1) {
      this.video.volume = vol;
      this.vol = this.video.volume;
    } else {
      this.video.volume = (vol < 0) ? 0 : 1;
      this.vol = this.video.volume;
    }
  }
}
