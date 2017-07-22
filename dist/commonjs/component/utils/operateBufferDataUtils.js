"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = require("../../structure/Color");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
exports.getColor3Data = function (index, colors) {
    var color = Color_1.Color.create(), size = 3, i = index * size;
    color.r = colors[i];
    color.g = colors[i + 1];
    color.b = colors[i + 2];
    return color;
};
exports.setColor3Data = function (index, color, colors) {
    var r = color.r, g = color.g, b = color.b, size = 3, index = index * size;
    typeArrayUtils_1.setTypeArrayValue(colors, index, r);
    typeArrayUtils_1.setTypeArrayValue(colors, index + 1, g);
    typeArrayUtils_1.setTypeArrayValue(colors, index + 2, b);
};
//# sourceMappingURL=operateBufferDataUtils.js.map