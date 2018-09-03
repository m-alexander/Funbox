import React from 'react';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';

const WaypointsMap = ({ points, onPointDragged, center }) => (
	<YMaps>
		<Map state={{ center, zoom: 10 }} width={600} height={600}>

			{points.map(point => (
				<Placemark
					key={point.id}
					geometry={{ coordinates: point.coords }}
					properties={{ balloonContent: point.title }}
					options={{ draggable: true }}
					events={{
						onDragEnd: ({ originalEvent }) => {
							onPointDragged(
								point,
								originalEvent.target.geometry.getCoordinates()
							)
						}
					}}
				/>
			))}

			<Polyline
				geometry={{
					coordinates: points.map(point => point.coords)
				}}
			/>
		</Map>
	</YMaps>
);

export default WaypointsMap
