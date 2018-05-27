import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import ScheduledTaskListItem from './ScheduledTaskListItem';
import { getVisibleTasks } from '../../../services/selectors';

class ScheduledTaskList extends Component {
  render() {
    const {
      tasks,
      loading,
    } = this.props;
    return (
      <Droppable droppableId="scheduled">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <List
              className="demo-loadmore-list"
              loading={loading}
              itemLayout="horizontal"
              dataSource={tasks}
              locale={{
                emptyText: 'No Scheduled Tasks',
              }}
              renderItem={(item, index) => (
                <ScheduledTaskListItem task={item} index={index} />
              )}
            />
          </div>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state),
  dateFilter: state.tasks.dateFilter,
  loading: state.loading.models.tasks,
});

export default connect(mapStateToProps)(ScheduledTaskList);
