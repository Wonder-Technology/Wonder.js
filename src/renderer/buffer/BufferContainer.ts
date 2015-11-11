/// <reference path="../../definitions.d.ts"/>
module dy {
    export class BufferContainer {
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public geometryData:GeometryData = null;

        private _cache:dyCb.Hash<Buffer> = dyCb.Hash.create<Buffer>();

        public getChild(type:BufferDataType) {
            var geometryData= null,
                result:Buffer = null;

            if(!this._needReCalcuteTangent(type) && this._cache.hasChild(type)){
                return this._cache.getChild(<any>type);
            }

            geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            switch (type) {
                case BufferDataType.VERTICE:
                case BufferDataType.NORMAL:
                case BufferDataType.TANGENT:
                case BufferDataType.COLOR:
                    result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
                    break;
                case BufferDataType.INDICE:
                    result = ElementBuffer.create(new Uint16Array(geometryData), BufferType.UNSIGNED_SHORT);
                    break;
                case BufferDataType.TEXCOORD:
                    result = ArrayBuffer.create(new Float32Array(geometryData), 2, BufferType.FLOAT);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNKNOW(`BufferDataType: ${type}`));
                    break;
            }

            this._cache.addChild(<any>type, result);

            return result;
        }

        public hasChild(type:BufferDataType) {
            var data = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return data && data.length > 0;
        }

        public dispose(){
            this._cache.forEach((buffer:Buffer) => {
                buffer.dispose();
            });
        }

        private _needReCalcuteTangent(type:BufferDataType){
            return this.geometryData.isTangentDirty && type === BufferDataType.TANGENT;
        }
    }
}
