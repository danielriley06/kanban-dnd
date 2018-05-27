import React from 'react';
import moment from 'moment';
import styled from 'styled-components';



const isSelected = (date, selectedDate) => {
  return selectedDate.format('D M Y') === date.format('D M Y');
};

const DaySelector = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  background: ${props => (isSelected(props.date, props.selectedDate) ? '#FFF' : 'inherit')};
  color: #4a4a4a;
  &:hover {
    background: #FFF;
    cursor: pointer;
  }
`;

const getStyles = ({ date }) => {
  const classes = ['day'];

  if (date.isSame(moment(), 'day')) {
    classes.push('today');
  }

  return classes.join(' ');
};

const defaultRenderDay = (date, selectedDate) => {
  const weekday = date.format('dd')[0];
  const day = date.date();

  const month =
    date.day() === 0 || day === 0 ? date.format('MMM') : <span>&nbsp;</span>;

  return (
    <DaySelector date={date} selectedDate={selectedDate}>
      <span style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{weekday}</span>
      <span style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{day}</span>
    </DaySelector>
  );
};

/**
 * WeekStripDay
 */
const WeekStripDay = ({ date, selectedDate }) => {
  const momentDate = moment(date);
  const momentSelectedDate = moment(selectedDate);

  return (
    <div className={getStyles({ date, momentSelectedDate })}>
      {defaultRenderDay(momentDate, momentSelectedDate)}
    </div>
  );
};

export default WeekStripDay;
