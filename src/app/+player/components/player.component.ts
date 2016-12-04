import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { State } from '../../shared/models/';
import { PlayerActions } from '../actions/';
import { PlayerState } from '../reducers/';
import { PlayerService } from '../services/';

@Component({
  selector: 'wtp-player',
  template: `
    <div class="row my-1 flex-items-xs-center">
      <h1>WebTorrent Player</h1>
    </div>

    <div class="row my-1 flex-items-xs-center">
      <wtp-url
        [url]="(playerModel$ | async)?.url"
        (changeUrl)="onChangeUrl($event)">
      </wtp-url>
    </div>
    
    <div class="row my-2 flex-items-xs-center">
      <wtp-video
        [isPaused]="(playerModel$ | async)?.isPaused"
        (togglePause)="onTogglePause($event)"
        (setVideo)="onSetVideo($event)"
        (toggleFullScreen)="onToggleFullScreen()">
      </wtp-video>
    </div>

    <div class="row flex-items-xs-center">
      <wtp-progress-controller
        [isPaused]="(playerModel$ | async)?.isPaused"
        (togglePause)="onTogglePause($event)"
        (drift)="onDrift($event)">
      </wtp-progress-controller>
    </div>
    
    <div class="row">
      <div class="offset-xs-2 col-xs-8">
        <wtp-progress-slider
          [progress]="(playerModel$ | async)?.progress"
          (jumpTo)="onJumpTo($event)">
        </wtp-progress-slider>
      </div>

      <!--<div class="col-xs-3">-->
        <!--<wtp-volume-slider-->
          <!--[video]="playerService.video">-->
        <!--</wtp-volume-slider>-->
      <!--</div>-->
    </div>
  `
})
export class PlayerComponent implements OnInit, OnDestroy {
  playerModel$: Observable<PlayerState>;
  pauser = new Subject();
  subsPauser: Subscription;

  constructor(
    private store: Store<State>,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.playerModel$ = this.store.select<PlayerState>('player');

    this.subsPauser = this.pauser
      .switchMap(paused => paused ? Observable.never() : Observable.interval(10000))
      .subscribe(() => {
        this.store.dispatch({ type: PlayerActions.PLAYER_UPDATE_PROGRESS })
      });

    const url = 'https://webtorrent.io/torrents/sintel.torrent';
    // const url = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';

    this.store.dispatch({ type: PlayerActions.PLAYER_LOAD_VIDEO, payload: url });
    this.pauser.next(false);
  }

  ngOnDestroy() {
    if (this.subsPauser) this.subsPauser.unsubscribe();
    this.pauser.next(true);
  }

  private onChangeUrl(url: string) {
    this.store.dispatch({ type: PlayerActions.PLAYER_LOAD_VIDEO, payload: url });
    this.pauser.next(false);
  }

  private onSetVideo(video: any) {
    this.playerService.video = video;
  }

  private onJumpTo(progress: number) {
    this.store.dispatch({ type: PlayerActions.PLAYER_JUMP_TO, payload: progress });
  }

  private onTogglePause(pause: boolean) {
    this.store.dispatch({ type: PlayerActions.PLAYER_TOGGLE_PAUSE, payload: pause });
    this.pauser.next(pause);
  }

  private onDrift(seconds: number) {
    this.store.dispatch({ type: PlayerActions.PLAYER_DRIFT, payload: seconds });
  }

  private onToggleFullScreen() {
    this.store.dispatch({ type: PlayerActions.PLAYER_TOGGLE_FULL_SCREEN });
  }
}
