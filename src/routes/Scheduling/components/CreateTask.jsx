import React from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select due date!' }],
};

const CreateTask = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      return (
        <Modal
          visible={visible}
          title="Create a new task"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Project Name">
              {getFieldDecorator('project')(
                <Input />
              )}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input the description of collection!' }],
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Due Date"
            >
              {getFieldDecorator('date-picker', config)(
                <DatePicker />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default CreateTask;
