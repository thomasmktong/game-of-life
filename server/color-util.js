module.exports = {
    t16: function (c) {
        return parseInt(('' + c).replace('#', ''), 16);
    },
    hex: function (c) {
        var t = (c >> 0).toString(16);
        return t.length == 2 ? t : '0' + t;
    },
    r: function (hex) {
        return hex >> 16 & 0xFF;
    },
    g: function (hex) {
        return hex >> 8 & 0xFF;
    },
    b: function (hex) {
        return hex & 0xFF;
    },
    avg: function (colorArr) {
        var self = this;
        var sumRGB = colorArr.reduce(function (total, colorEach) {
            var hex = self.t16(colorEach);
            total.r += self.r(hex);
            total.g += self.g(hex);
            total.b += self.b(hex);
            return total;
        }, { r: 0, g: 0, b: 0 });

        return '#' + self.hex(sumRGB.r / colorArr.length) + self.hex(sumRGB.g / colorArr.length) + self.hex(sumRGB.b / colorArr.length);
    }
}