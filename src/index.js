import dva from 'dva';
import createLoading from 'dva-loading';
import 'antd/dist/antd.css';

import taskModel from './models/task';
import appRouter from './router';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Register model
app.model(taskModel);

// 4. Router
app.router(appRouter);

// 4. Start
app.start('#root');

export default app._store;  // eslint-disable-line
