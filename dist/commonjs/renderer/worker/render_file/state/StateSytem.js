"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
exports.getState = function (StateData) {
    return StateData.state;
};
exports.setState = function (state, StateData) {
    return IO_1.IO.of(function () {
        StateData.state = state;
    });
};
//# sourceMappingURL=StateSytem.js.map