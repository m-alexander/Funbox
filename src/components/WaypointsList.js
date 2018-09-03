import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import './WaypointsList.css'

const SortableItem = SortableElement(({ point, onRemove }) => (
	<li className="WaypointsList-Item">
		<div>{point.title}</div>
		<button onClick={() => onRemove(point)}>&times;</button>
	</li>
));

const SortableList = SortableContainer(({ points, onRemove }) => {
	return (
		<ul className="WaypointsList">
			{points.map((point, index) => (
				<SortableItem key={point.id} index={index} point={point} onRemove={onRemove} />
			))}
		</ul>
	);
});

const WaypointsList = ({ points, onRemove, onItemDragged }) => {
	return (
		<SortableList
			points={points}
			onRemove={onRemove}
			onSortEnd={({ oldIndex, newIndex }) => onItemDragged(oldIndex, newIndex)}
		/>
	);
}

export default WaypointsList
