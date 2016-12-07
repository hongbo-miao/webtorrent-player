import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/ignoreElements';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { PlayerActions } from '../actions/';
import { PlayerService } from '../services/';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  @Effect() checkCompatibility$ = this.actions$
    .ofType(PlayerActions.PLAYER_CHECK_COMPATIBILITY)
    .switchMap(() => this.playerService.checkCompatibility()
      .map(isCompatible => ({ type: PlayerActions.PLAYER_CHECK_COMPATIBILITY_SUCCESS, payload: isCompatible }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_CHECK_COMPATIBILITY_FAIL, payload: error }))
    );

  @Effect() getVideo$ = this.actions$
    .ofType(PlayerActions.PLAYER_GET_VIDEO)
    .map<Action, string>(toPayload)
    .switchMap(url => this.playerService.getVideo(url)
      .map(() => ({ type: PlayerActions.PLAYER_GET_VIDEO_SUCCESS }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_GET_VIDEO_FAIL, payload: error }))
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
    .ofType(PlayerActions.PLAYER_UPDATE_PROGRESS_SUCCESS)
    .map<Action, number>(toPayload)
    .filter(progress => progress === 1000)
    .switchMap(() => Observable.concat([
      { type: PlayerActions.PLAYER_TOGGLE_PAUSE, payload: true },
      { type: PlayerActions.PLAYER_JUMP_TO, payload: 0 }
    ]));

  @Effect() triggerPlay$ = this.actions$
    .ofType(PlayerActions.PLAYER_GET_VIDEO_SUCCESS)
    .map(() => ({ type: PlayerActions.PLAYER_TOGGLE_PAUSE, payload: false }));

  @Effect() pause$ = this.actions$
    .ofType(PlayerActions.PLAYER_TOGGLE_PAUSE)
    .map<Action, boolean>(toPayload)
    .do(pause => this.playerService.pause(pause))
    .ignoreElements();

  @Effect() drift$ = this.actions$
    .ofType(PlayerActions.PLAYER_DRIFT)
    .map<Action, number>(toPayload)
    .do(seconds => this.playerService.drift(seconds))
    .ignoreElements();

  @Effect() jumpTo$ = this.actions$
    .ofType(PlayerActions.PLAYER_JUMP_TO)
    .map<Action, number>(toPayload)
    .switchMap(progress => this.playerService.jumpTo(progress)
      .map(progress => ({ type: PlayerActions.PLAYER_JUMP_TO_SUCCESS, payload: progress }))
      .catch(error => Observable.of({ type: PlayerActions.PLAYER_JUMP_TO_FAIL, payload: error }))
    );

  @Effect() toggleFullScreen$ = this.actions$
    .ofType(PlayerActions.PLAYER_TOGGLE_FULL_SCREEN)
    .do(() => this.playerService.toggleFullScreen())
    .ignoreElements();
}
