import React from 'react';
import { mount } from 'enzyme';

import WaypointsList from './WaypointsList';

jest.mock('react-sortable-hoc', () => ({
	SortableContainer: Component => props => <div className="container" onDragEnd={props.onSortEnd}><Component {...props} /></div>,
	SortableElement: Component => props => <div className="element"><Component {...props} /></div>
}));

const testPoints = [
	{ id: 1, title: 'test 1', coords: [1, 1] },
	{ id: 2, title: 'test 2', coords: [2, 2] },
	{ id: 3, title: 'test 3', coords: [3, 3] },
	{ id: 4, title: 'test 4', coords: [4, 4] },
	{ id: 5, title: 'test 5', coords: [5, 5] },
]


it('renders without crashing', () => {
	const points = []
	const onRemove = () => {}
	const onItemDragged = () => {}

	mount(<WaypointsList points={points} onRemove={onRemove} onItemDragged={onItemDragged} />)
});

it('renders list in right order', () => {
	const component = mount(<WaypointsList points={testPoints} />);

	const expectedResult = testPoints.map(p => p.title + '×').join('')
	expect(component.text()).toEqual(expectedResult);
});

it('calls onRemove', () => {
	const onRemove = jest.fn()
	const component = mount(<WaypointsList points={testPoints} onRemove={onRemove} />);
	const removeBtn = component.find('.WaypointsList-Item button').first()

	removeBtn.simulate('click')

	expect(onRemove).toBeCalledWith(testPoints[0]);
});

it('calls onItemDragged', () => {
	const onItemDragged = jest.fn()
	const component = mount(<WaypointsList points={testPoints} onItemDragged={onItemDragged} />);
	const sortable = component.find('.container').first()

	sortable.simulate('dragend', { oldIndex: 2, newIndex: 1 })

	expect(onItemDragged).toBeCalled();
});
