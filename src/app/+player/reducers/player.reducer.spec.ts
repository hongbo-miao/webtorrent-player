import { PlayerActions } from '../actions/';
import { playerReducer } from './';

describe('Reducer: playerReducer', () => {
  const mockState = {
    isCompatible: false,
    url: '',
    progress: 0,
    isBuffered: false,
    isPaused: true,
    downloadSpeed: 0,
    uploadSpeed: 0
  };

  it('should return current state when the action is not valid', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: 'INVALID_ACTION', payload: {} });
    expect(actual).toBe(state);
  });

  it('should check compatibility', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_CHECK_COMPATIBILITY_SUCCESS, payload: true });
    expect(actual.isCompatible).toBe(!state.isCompatible);
  });

  it('should add torrentUrl', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_GET_VIDEO, payload: 'https://example.com/' });
    expect(actual.url).toBe('https://example.com/');
  });

  it('should set isBuffered', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_BUFFERED });
    expect(actual.isBuffered).toBe(true);
  });

  it('should toggle isPaused', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_TOGGLE_PAUSE, payload: false });
    expect(actual.isPaused).toBe(!state.isPaused);
  });

  it('should jump to progress', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_JUMP_TO_SUCCESS, payload: 10 });
    expect(actual.progress).toBe(10);
  });

  it('should update the progress', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_UPDATE_PROGRESS_SUCCESS, payload: 10 });
    expect(actual.progress).toBe(10);
  });

  it('should update the info', () => {
    const state = Object.assign({}, mockState);
    const actual = playerReducer(state, { type: PlayerActions.PLAYER_UPDATE_INFO_SUCCESS, payload: { downloadSpeed: 1, uploadSpeed: 2 } });
    expect(actual.downloadSpeed).toBe(1);
    expect(actual.uploadSpeed).toBe(2);
  });
});
