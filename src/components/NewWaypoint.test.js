import React from 'react';
import { mount } from 'enzyme';

import NewWaypoint from './NewWaypoint';

it('renders without crashing', () => {
	mount(<NewWaypoint />);
});

it('calls onEnter', () => {
	const onEnter = jest.fn()
	const component = mount(<NewWaypoint onEnter={onEnter} />);
	const input = component.find('input').first()

	input.simulate('keyPress', { key: 'Test' })
	expect(onEnter).not.toBeCalled();

	input.simulate('keyPress', { key: 'Enter' })
	expect(onEnter).toBeCalled();
});
