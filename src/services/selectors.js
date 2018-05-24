import { createSelector } from 'reselect';
import moment from 'moment';
import get from 'lodash/get';

const getDateFilter = state => state.tasks.dateFilter;
const getTasks = state => state.tasks.data;

export const getVisibleTasks = createSelector(
  [getDateFilter, getTasks],
  (dateFilter, tasks) => {
    if (dateFilter) {
      return tasks.filter(t => moment(get(t, 'scheduledDate.S', '')).isSame(dateFilter, 'day'));
    }
    return tasks;
  }
);
