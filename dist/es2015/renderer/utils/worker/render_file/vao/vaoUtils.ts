import { createMap, deleteVal } from "../../../../../utils/objectUtils";
import { isNotValidVal } from "../../../../../utils/arrayUtils";
import { VaoMap, VboArrayMap } from "../../../../type/dataType";

export const removeVao = (gl: any, index: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap) => {
    var vboArray = vboArrayMap[index];

    /*!
     no need to consider the memory problem caused by not-used val in vaoMap, because geometry index will be repeat(geometry memory will be reallocated)
     */
    deleteVal(index, vaoMap);
    deleteVal(index, vboArrayMap);

    if (isNotValidVal(vboArray)) {
        return;

    }
    for (let vbo of vboArray) {
        gl.deleteBuffer(vbo);
    }
}

export const initData = (VaoDataFromSystem: any) => {
    VaoDataFromSystem.vaoMap = createMap();
    VaoDataFromSystem.vboArrayMap = createMap();
}
