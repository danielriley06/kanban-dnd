import moment from 'moment';
import { fetchTasks, createTask, updateTask } from '../services/api';

export default {
  namespace: 'tasks',

  state: {
    data: [],
    dateFilter: moment(new Date()).format('YYYY-MM-DD'),
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchTasks, payload);
      yield put({
        type: 'save',
        payload: response.data.Items,
      });
    },
    *create({ payload }, { call, put }) {
      const response = yield call(createTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *schedule({ payload, callback }, { call, put }) {
      yield put({
        type: 'save',
        payload: payload.tasks,
      });
      try {
        yield call(updateTask, payload.tasks[payload.taskIndex]);
      } catch (error) {
        console.log(error)
        // yield put({
        //   type: 'save',
        //   payload: error,
        // });
      }
    },
    *reorder({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *updateFilter({ payload }, { call, put }) {
      yield put({
        type: 'saveFilter',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveFilter(state, action) {
      return {
        ...state,
        dateFilter: action.payload,
      };
    },
  },
};
