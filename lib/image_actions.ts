import { Action } from 'react-sweet-state';
import api_client from './fetcher';
import { ImageState, ImageModel } from './types';

export const load_images = (): Action<ImageState> => async ({ setState, getState }) => {
  if (getState().loading) return;
  if (getState().data_loaded) return;
  setState({
    loading: true,
    data: [],
  });
  const res = await api_client.get('/images');

  setState({
    data: res.data,
    loading: false,
    data_loaded: true,
  });
};

export const add_image = (img_info: Partial<ImageModel>):
Action<ImageState> => async ({ setState, getState }) => {
  setState({ loading: true });
  const { data } = getState();
  const res = await api_client.post('/images', img_info);
  const new_data = res.data as ImageModel;
  setState({ data: [...data, new_data], loading: false });
};

export const remove = (id:string):
Action<ImageState> => async ({ setState, getState }) => {
  setState({ loading: true });
  const { data } = getState();
  await api_client.delete(`/images/${id}`);
  const new_state = data.filter((e) => e._id !== id);
  setState({ data: new_state, loading: false });
};

export const edit = (id:string, img_info: Partial<ImageModel>):
Action<ImageState> => async ({ setState, getState }) => {
  setState({ loading: true });
  const { data } = getState();
  const res = await api_client.post(`/images/${id}`, img_info);
  const new_data = res.data as ImageModel;
  const old_data = data.filter((client) => client._id !== id);

  setState({ data: [...old_data, new_data], loading: false });
};
