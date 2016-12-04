import { RouterState } from '@ngrx/router-store';

import { PlayerState } from '../../+player/reducers/';

export interface State {
  router: RouterState,
  player: PlayerState
}
