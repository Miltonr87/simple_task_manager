import React from 'react';
import { render } from '@testing-library/react';
import TaskManager from './task-manager';

test('should render the project without errors', () => {
  render(<TaskManager />);
});
