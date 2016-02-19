module wd{
    const _table = wdCb.Hash.create<string>();

    //todo remove <any>
    _table.addChild(<any>EBufferDataType.VERTICE, "vertices");
    _table.addChild(<any>EBufferDataType.INDICE, "indices");
    _table.addChild(<any>EBufferDataType.NORMAL, "normals");
    _table.addChild(<any>EBufferDataType.TEXCOORD, "texCoords");
    _table.addChild(<any>EBufferDataType.COLOR, "colors");
    _table.addChild(<any>EBufferDataType.TANGENT, "tangents");

    export class BufferDataTable{
        @ensure(function(result, type:EBufferDataType){
            Log.error(result === void 0, Log.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
        })
        public static getGeometryDataName(type:EBufferDataType){
            //todo remove <any>
            var result = _table.getChild(<any>type);

            return result;
        }
    }
}

