import React, { Component } from 'react';
import { List, Button } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import get from 'lodash/get';


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

class ScheduledTaskListItem extends Component {
  formatDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      return momentDate.format('MMM D');
    }
  }
  render() {
    const {
      task,
      index,
    } = this.props;
    return (
      <Draggable key={`s-${task.taskId.S}`} draggableId={`s-${task.taskId.S}`} index={index}>
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
              <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%' }}>
                <div style={{ display: 'flex', height: '25px', width: '100%', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#9e9e9e' }}>{task.title.S}</div>
                  <div style={{ fontSize: '10px', color: '#9b9b9b' }}>Due {this.formatDate(get(task, 'dueDate.S', ''))}</div>
                </div>
                <div style={{ width: '100%', fontSize: '15px', color: '#4a4a4a', padding: '2px 0' }}>{task.description.S}</div>
                <Button shape="circle" icon="check" size="small" />
              </div>
            </List.Item>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ScheduledTaskListItem;
