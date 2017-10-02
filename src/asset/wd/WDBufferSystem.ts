import { AccessorIndex, IWDSourceAcccessor, IWDSourceBufferView } from "./IWDSourceData";
import { Log } from "../../utils/Log";
import curry from "wonder-lodash/curry";
import { BufferReader } from "./BufferReader";

export const getTypeArrayFromAccessor = curry((bufferViews:Array<IWDSourceBufferView>, accessors: Array<IWDSourceAcccessor>, arrayBuffer:ArrayBuffer, accessorIndex:AccessorIndex) => {
    var accessor = accessors[accessorIndex],
        bufferView: IWDSourceBufferView = bufferViews[accessor.bufferView],
        byteOffset = accessor.byteOffset + bufferView.byteOffset,
        count = accessor.count * _getAccessorTypeSize(accessor),
        byteSize:number = _getAccessorByteSize(accessor.componentType),
        TypeArray:any = null;

    switch (accessor.componentType) {
        case 5120:
            TypeArray = Int8Array;
            break;
        case 5121:
            TypeArray = Uint8Array;
            break;
        case 5122:
            TypeArray = Int16Array;
            break;
        case 5123:
            TypeArray = Uint16Array;
            break;
        case 5125:
            TypeArray = Uint32Array;
            break;
        case 5126:
            TypeArray = Float32Array;
            break;
        default:
            Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${accessor.componentType}`));
            break;
    }

    return new TypeArray(arrayBuffer, byteOffset, count * byteSize);
})

export const getBufferReaderFromAccessor = curry((bufferViews:Array<IWDSourceBufferView>, accessor: IWDSourceAcccessor, arrayBuffer:ArrayBuffer) => {
    var bufferView: IWDSourceBufferView = bufferViews[accessor.bufferView],
        byteOffset = accessor.byteOffset + bufferView.byteOffset,
        count = accessor.count * _getAccessorTypeSize(accessor),
        byteSize:number = _getAccessorByteSize(accessor.componentType);

    return {
        bufferReader:BufferReader.create(arrayBuffer, byteOffset, count * byteSize),
        count: count
    }
})

const _getAccessorByteSize = (componentType:number) => {
    var byteSize:number = null;

    switch (componentType) {
        case 5120:
            byteSize = 1;
            break;
        case 5121:
            byteSize = 1;
            break;
        case 5122:
            byteSize = 2;
            break;
        case 5123:
            byteSize = 2;
            break;
        case 5126:
            byteSize = 4;
            break;
        default:
            Log.error(true, Log.info.FUNC_UNEXPECT(`componentType:${componentType}`));
            break;
    }

    return byteSize;
}

const _getAccessorTypeSize = (accessor: IWDSourceAcccessor): number => {
    var type = accessor.type;

    switch (type) {
        case "VEC2":
            return 2;
        case "VEC3":
            return 3;
        case "VEC4":
            return 4;
        case "MAT2":
            return 4;
        case "MAT3":
            return 9;
        case "MAT4":
            return 16;
        default:
            return 1;
    }
}
