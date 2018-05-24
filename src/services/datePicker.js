import moment from 'moment';

export const getNext7Days = (date) => {
  const dates = [];

  for (let i = 0; i < 7; i += 1) {
    const datePointer = moment(date).startOf('day');
    datePointer.add(i, 'days');
    dates.push(datePointer);
  }

  return dates;
};

export const getWeekSunday = (date) => {
  const offset = date.day() === 0 ? 7 : date.day();

  const monday = moment(date);
  monday.subtract(offset, 'days');

  return monday;
};

export const getWeekDays = (date) => {
  const monday = getWeekSunday(moment(date));
  return getNext7Days(monday);
};
