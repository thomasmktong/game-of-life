import React, { Component } from 'react';
import './Playground.css';

class Playground extends Component {

  render() {
    var playgroundElm = null;
    if (this.props.cells && Array.isArray(this.props.cells) && Array.isArray(this.props.cells[0])) {

      var cellWidth = 6;
      var playgroundHeight = this.props.cells.length * (cellWidth + 1);
      var playgroundWidth = this.props.cells[0].length * (cellWidth + 1);

      playgroundElm = this.props.cells.map((row, j) => {
        var rowElm = row.map((each, i) => {
          return (
            <div className="cell"
              style={{ width: cellWidth + 'px', height: cellWidth + 'px', backgroundColor: each }}
              key={i} onClick={() => this.onCellClick(j, i)}></div>
          );
        });
        return (
          <div className="row" key={j}>{rowElm}</div>
        );
      });
    }
    return (
      <div id="container" style={{ width: playgroundWidth + 'px', height: playgroundHeight + 'px' }}>
        {playgroundElm}
      </div>
    );
  }

  onCellClick(y, x) {
    if (this.props.onCellClick) this.props.onCellClick(y, x);
  }
}

export default Playground;
