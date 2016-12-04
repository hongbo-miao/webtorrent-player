import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'wtp-video',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .wrapper {
      position: relative;
    }
    
    video {
      width: 100%;
    }
    
    .full-screen {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 3rem;
      background-color: rgba(0, 0, 0, 0.3);
      padding: .2rem 1rem .5rem 1rem;
      margin: 0;
      border-radius: 0 0 .2rem .2rem;
    }
  `],
  template: `
    <div class="wrapper" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()">
      <video #video></video>

      <div class="full-screen" [hidden]="!isHover">
        <wtp-full-screen
          [video]="video">
        </wtp-full-screen>
      </div>
    </div>
  `
})
export class VideoComponent implements AfterViewInit {
  @Output() setVideo = new EventEmitter<any>();

  @ViewChild('video') private videoEl: ElementRef;

  video: any;
  isHover: boolean = false;

  ngAfterViewInit() {
    this.video = this.videoEl.nativeElement;
    this.setVideo.emit(this.video);
  }

  private onMouseOver() {
    this.isHover = true;
  }

  private onMouseLeave() {
    this.isHover = false;
  }
}
