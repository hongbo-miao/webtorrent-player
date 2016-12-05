import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

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
      <video #video (click)="clickStream.next($event)" (dblclick)="onToggleFullScreen()"></video>

      <div [class.twp-hidden]="!isBuffered || !isHover">
        <wtp-full-screen
          (toggleFullScreen)="onToggleFullScreen()">
        </wtp-full-screen>
      </div>
      
      <div [class.twp-hidden]="isBuffered && !isHover">
        <wtp-info
          [downloadSpeed]="downloadSpeed"
          [uploadSpeed]="uploadSpeed">
        </wtp-info>
      </div>
    </div>
  `
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isPaused: boolean;
  @Input() isBuffered: boolean;
  @Input() downloadSpeed: number;
  @Input() uploadSpeed: number;
  @Output() togglePause = new EventEmitter<boolean>();
  @Output() setVideo = new EventEmitter<any>();
  @Output() toggleFullScreen = new EventEmitter<void>();

  @ViewChild('video') private videoEl: ElementRef;

  video: any;
  isHover: boolean = false;
  clickStream = new Subject();

  ngOnInit() {
    // to avoid togglePause when double click
    this.clickStream
      .buffer(this.clickStream.debounceTime(200))
      .map(list => list.length)
      .filter(x => x === 1)
      .subscribe(() => this.togglePause.emit(!this.isPaused));
  }

  ngAfterViewInit() {
    this.video = this.videoEl.nativeElement;
    this.setVideo.emit(this.video);
  }

  ngOnDestroy() {
    if (this.clickStream) this.clickStream.unsubscribe();
  }

  private onMouseOver() {
    this.isHover = true;
  }

  private onMouseLeave() {
    this.isHover = false;
  }

  private onToggleFullScreen() {
    this.toggleFullScreen.emit();
  }
}
