import axios from 'axios';

export const fetchTasks = () =>
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const createTask = (task) =>
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...task
      }
    });

  export const updateTask = (task) =>
    axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_BASE_URL}/tasks`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...task
      }
    });