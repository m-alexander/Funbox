import React from 'react';
import { mount } from 'enzyme';

import WaypointsMap from './WaypointsMap';

jest.mock('react-yandex-maps', () => ({
	YMaps: ({ children }) => <div>{children}</div>,
	Map: ({ children }) => <div>{children}</div>,
	Placemark: ({ properties, geometry, events }) => (
		<div
			className="placemark"
			coords={geometry.coordinates}
			ballooncontent={properties.balloonContent}
			onDrag={events.onDragEnd}
		/>
	),
	Polyline: () => <div className="polyline"></div>
}));

const testPoints = [
	{ id: 1, title: 'test 1', coords: [1, 1] },
	{ id: 2, title: 'test 2', coords: [2, 2] },
	{ id: 3, title: 'test 3', coords: [3, 3] },
	{ id: 4, title: 'test 4', coords: [4, 4] },
	{ id: 5, title: 'test 5', coords: [5, 5] },
]

it('renders without crashing', () => {
	mount(<WaypointsMap points={[]} />);
});

it('renders placemarks and polyline', () => {
	const component = mount(<WaypointsMap points={testPoints} />);

	expect(component.find('.placemark').length).toEqual(testPoints.length);
	expect(component.exists('.polyline')).toEqual(true);
});

it('renders placemarks with right balloonContent', () => {
	const component = mount(<WaypointsMap points={testPoints} />);

	const { ballooncontent, coord } = component.find('.placemark').first().props()
	expect(ballooncontent).toEqual(testPoints[0].title);
	expect(coord).toEqual(testPoints[0].coord);
});

it('calls onPointDragged', () => {
	const onPointDragged = jest.fn();
	const component = mount(<WaypointsMap points={testPoints} onPointDragged={onPointDragged} />);

	const placemark = component.find('.placemark').first()
	placemark.simulate('drag', {
		originalEvent: {
			target: {
				geometry: {
					getCoordinates: () => testPoints[0].coords
				}
			}
		}
	})

	expect(onPointDragged).toBeCalled();
});
