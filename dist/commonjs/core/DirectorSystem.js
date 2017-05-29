"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
exports.getState = function (DirectorData) {
    return DirectorData.state;
};
exports.setState = function (state, DirectorData) {
    return IO_1.IO.of(function () {
        DirectorData.state = state;
    });
};
//# sourceMappingURL=DirectorSystem.js.map