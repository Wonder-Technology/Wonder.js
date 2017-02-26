import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { EBufferDataType } from "./EBufferDataType";
import { ensure } from "../../definition/typescript/decorator/contract";
import { Log } from "../../utils/Log";

const _table = Hash.create<string>();

//todo remove <any>
_table.addChild(<any>EBufferDataType.VERTICE, "vertices");
_table.addChild(<any>EBufferDataType.INDICE, "indices");
// _table.addChild(<any>EBufferDataType.NORMAL, "normals");
// _table.addChild(<any>EBufferDataType.TEXCOORD, "texCoords");
// _table.addChild(<any>EBufferDataType.COLOR, "colors");
// _table.addChild(<any>EBufferDataType.TANGENT, "tangents");
// _table.addChild(<any>EBufferDataType.JOINT_INDICE, "jointIndices");
// _table.addChild(<any>EBufferDataType.JOINT_WEIGHT, "jointWeights");

@registerClass("BufferDataTable")
export class BufferDataTable {
    @ensure(function(result, type: EBufferDataType) {
        Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
    })
    public static getGeometryDataName(type: EBufferDataType) {
        //todo remove <any>
        var result = _table.getChild(<any>type);

        return result;
    }
}