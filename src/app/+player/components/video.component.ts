import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as WebTorrent from 'webtorrent';

@Component({
  selector: 'my-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    video {
      width: 100%;
    }
  `],
  template: `
    video
    <video #video></video>
  `
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video') private videoEl: ElementRef;
  @Output() setVideo = new EventEmitter<any>();
  video: any;

  ngAfterViewInit() {
    this.video = this.videoEl.nativeElement;
    this.setVideo.emit(this.video);

    this.loadVideo();
  }

  private loadVideo() {
    const torrentId = 'https://webtorrent.io/torrents/sintel.torrent';
    // const torrentId = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

    const client = new WebTorrent();
    console.log('client', client);

    client.add(torrentId, torrent => {
      console.log('torrent.files', torrent.files);

      torrent.files[0].renderTo(this.video);
    });
  }
}
