var cloneDeep = require('clone-deep');
var randomColor = require('randomcolor');
var colorUtil = require('./color-util');
var pattern = require('../common/pattern');

module.exports = {

    playgroundWidth: 100,
    playgroundHeight: 50,
    playground: null,
    players: null,
    init: function () {
        this.players = {};
        this.playground = pattern.getEmpty(this.playgroundWidth, this.playgroundHeight);
    },
    playerIn: function (playerId) {
        // gen a random color and return playerId for new player
        // this won't produce black which is the background color in front end
        var playerColor = randomColor({ luminosity: 'bright' });
        this.players[playerId] = playerColor;
    },
    playerOut: function (playerId) {
        delete this.players[playerId];
    },
    spawnAt: function (y, x, playerId) {
        this.playground[y][x] = this.players[playerId];
    },
    pattern: function (patternName, playerId) {
        pattern.apply(this.playground, pattern.library[patternName], this.players[playerId]);
    },
    neighbours: function (y, x, findAvg) {
        // check the 8 neighbours of the given cell
        // check if the given cell is at playground edge
        var xLowBound = Math.max(x - 1, 0);
        var xUpBound = Math.min(x + 1, this.playgroundWidth - 1);
        var yLowBound = Math.max(y - 1, 0);
        var yUpBound = Math.min(y + 1, this.playgroundHeight - 1);
        var liveNeighbours = [];

        for (var i = xLowBound; i <= xUpBound; i++) {
            for (var j = yLowBound; j <= yUpBound; j++) {
                if (i !== x || j !== y) {
                    if (this.playground[j][i]) {
                        liveNeighbours.push(this.playground[j][i]);
                    }
                }
            }
        }
        return findAvg ? colorUtil.avg(liveNeighbours) : liveNeighbours.length;
    },
    runRules: function () {

        var updatingPlayground = cloneDeep(this.playground);
        var updated = false;

        for (var i = 0; i < this.playgroundWidth; i++) {
            for (var j = 0; j < this.playgroundHeight; j++) {

                var neighboursCnt = this.neighbours(j, i);

                // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                // 2. Any live cell with two or three live neighbours lives on to the next generation.
                // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
                if (this.playground[j][i] && (neighboursCnt < 2 || neighboursCnt > 3)) {
                    updatingPlayground[j][i] = null;
                    updated = true;
                }

                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                //    it will be given a color that is the average of its neighbours (that revive it).
                if (!this.playground[j][i] && neighboursCnt === 3) {
                    updatingPlayground[j][i] = this.neighbours(j, i, true);
                    updated = true;
                }
            }
        }

        this.playground = updatingPlayground;
        return updated;
    }

};