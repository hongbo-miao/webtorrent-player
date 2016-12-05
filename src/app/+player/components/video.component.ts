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
  `],
  template: `
    <div class="wrapper" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()">
      <video #video (click)="onTogglePause()" (dblclick)="onToggleFullScreen()"></video>

      <div [hidden]="!isBuffered || !isHover">
        <wtp-full-screen
          (toggleFullScreen)="onToggleFullScreen()">
        </wtp-full-screen>
      </div>
      
      <div [hidden]="isBuffered && !isHover">
        <wtp-info
          [downloadSpeed]="downloadSpeed"
          [uploadSpeed]="uploadSpeed">
        </wtp-info>
      </div>
    </div>
  `
})
export class VideoComponent implements AfterViewInit {
  @Input() isPaused: boolean;
  @Input() isBuffered: boolean;
  @Input() downloadSpeed: string;
  @Input() uploadSpeed: string;
  @Output() togglePause = new EventEmitter<boolean>();
  @Output() setVideo = new EventEmitter<any>();
  @Output() toggleFullScreen = new EventEmitter<void>();

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

  private onTogglePause() {
    this.togglePause.emit(!this.isPaused);
  }

  private onToggleFullScreen() {
    this.toggleFullScreen.emit();
  }
}
