module wd{
    const _table = wdCb.Hash.create<string>();

    //todo remove <any>
    _table.addChild(<any>BufferDataType.VERTICE, "vertices");
    _table.addChild(<any>BufferDataType.INDICE, "indices");
    _table.addChild(<any>BufferDataType.NORMAL, "normals");
    _table.addChild(<any>BufferDataType.TEXCOORD, "texCoords");
    _table.addChild(<any>BufferDataType.COLOR, "colors");
    _table.addChild(<any>BufferDataType.TANGENT, "tangents");

    export class BufferDataTable{
        public static getGeometryDataName(type:BufferDataType){
            //todo remove <any>
            var result = _table.getChild(<any>type);

            Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));

            return result;
        }
    }
}

