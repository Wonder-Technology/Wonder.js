"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../../../definition/typescript/decorator/contract");
var objectUtils_1 = require("../../../../../../utils/objectUtils");
exports.getUniformLocation = contract_1.ensureFunc(function (pos, gl, name, uniformLocationMap) {
}, function (gl, program, name, uniformLocationMap) {
    var pos = null;
    pos = uniformLocationMap[name];
    if (objectUtils_1.isValidMapValue(pos)) {
        return pos;
    }
    pos = gl.getUniformLocation(program, name);
    uniformLocationMap[name] = pos;
    return pos;
});
exports.isUniformLocationNotExist = function (pos) {
    return pos === null;
};
//# sourceMappingURL=locationUtils.js.map