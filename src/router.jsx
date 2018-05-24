import React from 'react';
import GlobalLayout from './layouts/GlobalLayout';
import Scheduler from './routes/Scheduling';

function RouterConfig() {
  return (
    <GlobalLayout>
      <Scheduler />
    </GlobalLayout>
  );
}

export default RouterConfig;
