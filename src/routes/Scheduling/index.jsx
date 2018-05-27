import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import findIndex from 'lodash/findIndex';

import TaskList from './components/TaskList';
import DatePicker from './components/DatePicker';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Scheduling extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'tasks/fetch',
    });
  }

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = reorder(
        this.props.tasks,
        source.index,
        destination.index
      );

      this.props.dispatch({
        type: 'tasks/reorder',
        payload: reorderedTasks,
      });
    } else {
      this.schedule(draggableId);
    }
  };


  schedule = (taskId) => {
    const sourceClone = Array.from(this.props.tasks);
    const taskIndex = findIndex(sourceClone, task => task.taskId.S === taskId);
    sourceClone[taskIndex].scheduledDate = {
      S: this.props.dateFilter,
    };
    this.props.dispatch({
      type: 'tasks/schedule',
      payload: {
        tasks: sourceClone,
        taskIndex,
      },
    });
  }

  render() {
    const {
      tasks,
      loading,
    } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={{ span: 6, offset: 2 }}>
            <DatePicker />
          </Col>
          <Col xs={24} sm={12} lg={{ span: 8, offset: 4 }}>
            <TaskList
              tasks={tasks}
              loading={loading}
            />
          </Col>
        </Row>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.data,
  dateFilter: state.tasks.dateFilter,
  loading: state.loading.models.tasks,
});

export default connect(mapStateToProps)(Scheduling);

