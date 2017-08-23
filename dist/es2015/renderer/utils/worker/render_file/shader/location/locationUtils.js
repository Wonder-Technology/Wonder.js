import { ensureFunc } from "../../../../../../definition/typescript/decorator/contract";
import { isValidMapValue } from "../../../../../../utils/objectUtils";
export var getUniformLocation = ensureFunc(function (pos, gl, name, uniformLocationMap) {
}, function (gl, program, name, uniformLocationMap) {
    var pos = null;
    pos = uniformLocationMap[name];
    if (isValidMapValue(pos)) {
        return pos;
    }
    pos = gl.getUniformLocation(program, name);
    uniformLocationMap[name] = pos;
    return pos;
});
export var isUniformLocationNotExist = function (pos) {
    return pos === null;
};
//# sourceMappingURL=locationUtils.js.map