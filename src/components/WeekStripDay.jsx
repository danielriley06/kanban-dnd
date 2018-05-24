import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const DaySelector = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  &:hover {
    background: #FFF;
    cursor: pointer;
  }
`;

const getStyles = ({ date, active }) => {
  const classes = ['day'];

  if (active) {
    classes.push('active');
  }

  if (date.isSame(moment(), 'day')) {
    classes.push('today');
  }

  return classes.join(' ');
};

const defaultRenderDay = ({ date }) => {
  const weekday = date.format('dd')[0];
  const day = date.date();

  const month =
    date.day() === 0 || day === 0 ? date.format('MMM') : <span>&nbsp;</span>;

  return (
    <DaySelector>
      <span style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{weekday}</span>
      <span style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{day}</span>
    </DaySelector>
  );
};

/**
 * WeekStripDay
 */
const WeekStripDay = ({ date, active }) => {
  const momentDate = moment(date);

  return (
    <div className={getStyles({ date, active })}>
      {defaultRenderDay({ date: momentDate })}
    </div>
  );
};

export default WeekStripDay;
