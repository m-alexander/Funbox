import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import NewWaypoint from './NewWaypoint'
import WaypointsList from './WaypointsList'
import WaypointsMap from './WaypointsMap'
import TwoColumnsLayout from './TwoColumnsLayout'


const getNextId = (startId => () => startId++)(1)

class App extends Component {

  state = {
    points: []
  }

  constructor(props) {
    super(props)

    this.center = [55.75, 37.61]

    this.addWaypoint = this.addWaypoint.bind(this)
    this.removeWaypoint = this.removeWaypoint.bind(this)
    this.moveWaypoint = this.moveWaypoint.bind(this)
    this.changeWaipointCoords = this.changeWaipointCoords.bind(this)
  }

  addWaypoint(title) {
    this.setState({
      points: [
        ...this.state.points,
        {
          id: getNextId(),
          title,
          coords: this.center
        }
      ]
    })
  }

  removeWaypoint(point) {
    const points = this.state.points.filter(item => item !== point)
    this.setState({ points })
  }

  moveWaypoint(from, to) {
    const points = arrayMove(this.state.points, from, to)
    this.setState({ points })
  }

  changeWaipointCoords(point, coords) {
    const points = [...this.state.points]

    points.splice(
      this.state.points.indexOf(point),
      1,
      { ...point, coords }
    )

    this.setState({ points })
  }

  render() {
    const { points } = this.state;
    return (
      <TwoColumnsLayout
        leftColumn={
          <div>
            <NewWaypoint onEnter={this.addWaypoint} />
            <WaypointsList
              points={points}
              onRemove={this.removeWaypoint}
              onItemDragged={this.moveWaypoint}
            />
          </div>
        }
        rightColumn={
          <WaypointsMap
            points={points}
            center={this.center}
            onPointDragged={this.changeWaipointCoords}
          />
        }
      />
    );
  }
}

export default App;
