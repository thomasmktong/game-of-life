
module.exports = {
    library: {
        blinker: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        toad: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        beehive: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        glider: [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ],
        spaceship: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
    },
    getEmpty: function (playgroundWidth, playgroundHeight) {
        var playground = [];
        for (var j = 0; j < playgroundHeight; j++) {
            playground[j] = [];
            for (var i = 0; i < playgroundWidth; i++) {
                playground[j][i] = null;
            }
        }
        return playground;
    },
    apply: function (original, pattern, color) {

        if (!color) color = '#FFFFFF';

        var rangeHeight = original.length - pattern.length;
        var rangeWidth = original[0].length - pattern[0].length;

        var randomY = Math.floor(Math.random() * rangeHeight);
        var randomX = Math.floor(Math.random() * rangeWidth);

        if (randomY >= 0 && randomX >= 0) {
            for (var j = 0; j < pattern.length; j++) {
                for (var i = 0; i < pattern[j].length; i++) {
                    original[j + randomY][i + randomX] = pattern[j][i] ? color : null;
                }
            }
        }
        return original;
    }
};