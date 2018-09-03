import React from 'react';
import { mount } from 'enzyme';

import TwoColumnsLayout from './TwoColumnsLayout';

it('renders without crashing', () => {
  mount(<TwoColumnsLayout leftColumn={<div />} rightColumn={<div />} />);
});
