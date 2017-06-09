import { EBufferType } from "../renderer/enum/EBufferType";
import { error, info } from "./Log";

export var getVertexDataSize = () => 3;

export var getIndexDataSize = () => 1;

export var getUIntArrayClass = (indexType:EBufferType) => {
    switch (indexType){
        case EBufferType.UNSIGNED_SHORT:
            return Uint16Array;
        case EBufferType.INT:
            return Uint32Array;
        default:
            error(true, info.FUNC_INVALID(`indexType:${indexType}`));
            break;
    }
}

