import { Component, OnChanges, SimpleChange, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
    <video #video></video>
  `
})
export class VideoComponent implements OnChanges, AfterViewInit {
  @Input() url: string;
  @Output() setVideo = new EventEmitter<any>();

  @ViewChild('video') private videoEl: ElementRef;

  video: any;

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['url'] && changes['url'].previousValue !== changes['url'].currentValue) {
      if (!this.url) return;

      this.loadVideo();
    }
  }

  ngAfterViewInit() {
    this.video = this.videoEl.nativeElement;
    this.setVideo.emit(this.video);
  }

  private loadVideo() {
    const client = new WebTorrent();

    client.add(this.url, torrent => {
      torrent.files[0].renderTo(this.video);
    });
  }
}
