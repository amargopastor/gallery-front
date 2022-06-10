import {
  createStore,
  createHook,
  BoundActions,
  HookFunction,
} from 'react-sweet-state';
import * as actions from './image_actions';
import { ImageState as State } from './types';

type Actions = typeof actions;

const initialState: State = {
  data: [],
  loading: false,
  data_loaded: false,
};

const Store = createStore<State, Actions>({
  name: 'images',
  initialState,
  actions,
});

const useImages: HookFunction<State, BoundActions<State, Actions>, void> = createHook(Store);
export default useImages;
