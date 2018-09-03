import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';

const testPoints = [
  { id: 1, title: 'test 1', coords: [1, 1] },
  { id: 2, title: 'test 2', coords: [2, 2] },
  { id: 3, title: 'test 3', coords: [3, 3] },
  { id: 4, title: 'test 4', coords: [4, 4] },
  { id: 5, title: 'test 5', coords: [5, 5] },
]

it('renders without crashing', () => {
  mount(<App />);
});

describe('methods', () => {

  it('addWaypoint', () => {
    const div = document.createElement('div');
    const app = ReactDOM.render(<App />, div);

    app.addWaypoint('test')

    expect(app.state.points.length).toEqual(1);
    expect(app.state.points[0].title).toEqual('test');
  });

  it('removeWaypoint', () => {
    const div = document.createElement('div');
    const app = ReactDOM.render(<App />, div);
    app.state.points = [...testPoints]

    app.removeWaypoint(app.state.points[0])

    expect(app.state.points.length).toEqual(4);
  });

  it('moveWaypoint', () => {
    const div = document.createElement('div');
    const app = ReactDOM.render(<App />, div);
    app.state.points = [...testPoints]

    app.moveWaypoint(2, 0)

    expect(app.state.points[0].title).toEqual('test 3');
  });

  it('changeWaipointCoords', () => {
    const div = document.createElement('div');
    const app = ReactDOM.render(<App />, div);
    app.state.points = [...testPoints]

    app.changeWaipointCoords(app.state.points[0], [1, 1])

    expect(app.state.points[0].coords).toEqual([1, 1]);
  });

})
