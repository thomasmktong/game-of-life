import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Playground from './Playground';
import pattern from '../common/pattern';
import './index.css';

import io from 'socket.io-client';
var socket = io.connect();

class App extends Component {

  constructor(props) {
    super(props);

    var playground = [];
    this.state = { cells: playground };

    this.patternPalettes = Object.keys(pattern.library).map(patternName => {
      return {
        name: patternName,
        cells: pattern.apply(pattern.getEmpty(7, 7), pattern.library[patternName])
      }
    });
  }

  componentDidMount() {
    socket.on('update', cells => {
      this.setState({ cells });
    });
  }

  render() {
    var patternPalettesElm = this.patternPalettes.map(p => {
      return (
        <div key={p.name} className="palette">
          <Playground cells={p.cells} onCellClick={() => this.onPaletteClick(p.name)} />
        </div>
      );
    });

    return (
      <div>
        <div className="panel title">
          Game of Life Multiplayer
        </div>
        <Playground key="playground" cells={this.state.cells} onCellClick={this.onCellClick} />
        <div className="panel">
          {patternPalettesElm}
        </div>
      </div>
    );
  }

  onCellClick(y, x) {
    socket.emit('spawn', { y: y, x: x });
  }

  onPaletteClick(patternName) {
    socket.emit('pattern', { patternName });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
