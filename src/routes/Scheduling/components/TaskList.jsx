import React, { Component } from 'react';
import { List, Button } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import get from 'lodash/get';

import CreateTask from './CreateTask';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

class TaskList extends Component {
  state = {
    showModal: false,
  }
  formatDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
      return momentDate.format('MMM D');
    }
  }

  handleShowModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }))
  }
  render() {
    const {
      tasks,
      loading,
    } = this.props;
    const {
      showModal
    } = this.state;
    return (
      <Droppable droppableId="droppable" ignoreContainerClipping>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <CreateTask visible={showModal} onCancel={this.handleShowModal} />
            <List
              className="demo-loadmore-list"
              loading={loading}
              itemLayout="horizontal"
              dataSource={tasks}
              header={
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1 }}>
                    <Button shape="circle" icon="plus" onClick={this.handleShowModal} />
                  </div>
                  <div style={{ width: '60px', display: 'flex', alignItems: 'flex-end' }}>
                    Due
                  </div>
                  <div style={{ width: '60px', display: 'flex', alignItems: 'flex-end' }}>
                    Schedule
                  </div>
                </div>
              }
              renderItem={(item, index) => (
                <Draggable key={item.taskId.S} draggableId={item.taskId.S} index={index}>
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
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Button shape="circle" icon="check" />}
                          title={<a href="https://ant.design">{item.title.S}</a>}
                          description={item.description.S}
                        />
                        <div style={{ width: '60px' }}>{this.formatDate(get(item, 'dueDate.S', ''))}</div>
                        <div style={{ width: '60px' }}>{this.formatDate(get(item, 'scheduledDate.S', ''))}</div>
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

export default TaskList;
