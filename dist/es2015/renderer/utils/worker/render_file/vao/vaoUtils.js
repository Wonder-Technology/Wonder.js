import { createMap, deleteVal } from "../../../../../utils/objectUtils";
import { isNotValidVal } from "../../../../../utils/arrayUtils";
export var removeVao = function (gl, index, vaoMap, vboArrayMap) {
    var vboArray = vboArrayMap[index];
    deleteVal(index, vaoMap);
    deleteVal(index, vboArrayMap);
    if (isNotValidVal(vboArray)) {
        return;
    }
    for (var _i = 0, vboArray_1 = vboArray; _i < vboArray_1.length; _i++) {
        var vbo = vboArray_1[_i];
        gl.deleteBuffer(vbo);
    }
};
export var initData = function (VaoDataFromSystem) {
    VaoDataFromSystem.vaoMap = createMap();
    VaoDataFromSystem.vboArrayMap = createMap();
};
//# sourceMappingURL=vaoUtils.js.map