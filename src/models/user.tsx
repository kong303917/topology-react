import { Reducer } from 'redux';
import { Effect } from 'dva';
import { get } from '@/services/user';

export interface IUser {
  current: any
}

export interface UserModelType {
  namespace: 'user';
  state: IUser;
  effects: {
    fetch: Effect;
  };
  reducers: {
    set: Reducer<IUser>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    current: null
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(get);
      yield put({
        type: 'set',
        payload: response,
      });
    },
  },

  reducers: {
    set(state, action) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
};

export default UserModel;