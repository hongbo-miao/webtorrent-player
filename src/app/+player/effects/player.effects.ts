import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { PlayerActions } from '../actions/';
import { PlayerService } from '../services/';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  @Effect() loadVideo$ = this.actions$
    .ofType(PlayerActions.PLAYER_LOAD_VIDEO)
    .map<string>(toPayload)
    .switchMap(url => this.playerService.loadVideo(url)
      .map(() => ({ type: PlayerActions.PLAYER_LOAD_VIDEO_SUCCESS }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_LOAD_VIDEO_FAIL, payload: error }))
    );

  @Effect() updateInfo$ = this.actions$
    .ofType(PlayerActions.PLAYER_UPDATE_INFO)
    .switchMap(() => this.playerService.updateInfo()
      .map(({ downloadSpeed, uploadSpeed }) => ({ type: PlayerActions.PLAYER_UPDATE_INFO_SUCCESS, payload: { downloadSpeed, uploadSpeed } }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_UPDATE_INFO_FAIL, payload: error }))
    );

  @Effect() updateProgress$ = this.actions$
    .ofType(PlayerActions.PLAYER_UPDATE_PROGRESS)
    .switchMap(() => this.playerService.updateProgress()
      .map(progress => ({ type: PlayerActions.PLAYER_UPDATE_PROGRESS_SUCCESS, payload: progress }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_UPDATE_PROGRESS_FAIL, payload: error }))
    );

  @Effect() triggerPause$ = this.actions$
    .ofType(PlayerActions.PLAYER_LOAD_VIDEO_SUCCESS)
    .map(() => ({ type: PlayerActions.PLAYER_TOGGLE_PAUSE, payload: false }));

  @Effect() pause$ = this.actions$
    .ofType(PlayerActions.PLAYER_TOGGLE_PAUSE)
    .map<boolean>(toPayload)
    .do(pause => this.playerService.pause(pause))
    .ignoreElements();

  @Effect() drift$ = this.actions$
    .ofType(PlayerActions.PLAYER_DRIFT)
    .map<number>(toPayload)
    .do(seconds => this.playerService.drift(seconds))
    .ignoreElements();

  @Effect() jumpTo$ = this.actions$
    .ofType(PlayerActions.PLAYER_JUMP_TO)
    .map<number>(toPayload)
    .switchMap(progress => this.playerService.jumpTo(progress)
      .map(progress => ({ type: PlayerActions.PLAYER_JUMP_TO_SUCCESS, payload: progress }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_JUMP_TO_FAIL, payload: error }))
    );

  @Effect() toggleFullScreen$ = this.actions$
    .ofType(PlayerActions.PLAYER_TOGGLE_FULL_SCREEN)
    .do(() => this.playerService.toggleFullScreen())
    .ignoreElements();
}
