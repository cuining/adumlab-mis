import type { Effect, Reducer } from 'umi';

import type { BasicGood } from './data';
import { queryBasicProfile } from './service';

export interface StateType {
  basicGoods: BasicGood[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'profileAndbasic5',

  state: {
    basicGoods: [],
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
