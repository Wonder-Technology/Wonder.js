"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeRadius = function (color, constant, linear, quadratic) {
    var lightMax = Math.max(color[0], color[1], color[2]);
    return (-linear + Math.sqrt(Math.pow(linear, 2) - 4 * quadratic * (constant - (256.0 / 5.0) * lightMax)))
        / (2 * quadratic);
};
//# sourceMappingURL=pointLightUtils.js.map