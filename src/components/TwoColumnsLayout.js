import React from 'react';

import './TwoColumnsLayout.css'

const TwoColumnsLayout = ({ leftColumn, rightColumn }) => {
	return (
		<div className="TwoColumnsLayout">
			<div className="TwoColumnsLayout-LeftColumn">{leftColumn}</div>
			<div className="TwoColumnsLayout-RightColumn">{rightColumn}</div>
		</div>
	);
}

export default TwoColumnsLayout
