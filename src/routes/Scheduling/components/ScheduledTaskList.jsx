import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import get from 'lodash/get';

import { getVisibleTasks } from '../../../services/selectors';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

class ScheduledTaskList extends Component {
  formatDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      return momentDate.format('MMM D');
    }
  }
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
                <Draggable key={`s-${item.taskId.S}`} draggableId={`s-${item.taskId.S}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <List.Item style={{ height: '80px', margin: '8px', padding: '0 8px', boxShadow: '0 1px 2px 0 hsla(0,0%,80%,.5)', background: '#FFF'}}>
                        <List.Item.Meta
                          avatar={<Button shape="circle" icon="check" />}
                          title={<a href="https://ant.design">{item.title.S}</a>}
                          description={item.description.S}
                        />
                        <div style={{ width: '100px' }}>Due {this.formatDate(get(item, 'dueDate.S', ''))}</div>
                      </List.Item>
                    </div>
                  )}
                </Draggable>
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
