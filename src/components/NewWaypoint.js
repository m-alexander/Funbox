import React from 'react';

import './NewWaypoint.css'

export default function NewWaypoint({ onEnter }) {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onEnter(e.target.value);
			e.target.value = '';
		}
	}

	return (
		<div className="NewWaypoint">
			<input
				placeholder="Новая точка маршрута"
				className="NewWaypoint-Input"
				onKeyPress={handleKeyPress}
			/>
		</div>
	);
}
