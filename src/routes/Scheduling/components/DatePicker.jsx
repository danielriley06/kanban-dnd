import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import WeekStripDatePicker from '../../../components/WeekStripDatePicker';
import ScheduledTaskList from './ScheduledTaskList';

class DatePicker extends Component {
  onPanelChange = (selectedDate) => {
    this.props.dispatch({
      type: 'tasks/updateFilter',
      payload: selectedDate,
    });
  }
  render() {
    return (
      <div style={{ background: '#f5f5f5', borderRadius: 4, height: 'calc(100vh - 120px)', overflowY: 'scroll' }}>
        <WeekStripDatePicker onChange={this.onPanelChange} />
        <ScheduledTaskList />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DatePicker);

