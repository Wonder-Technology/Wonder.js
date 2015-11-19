/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class BufferContainer {
        public geometryData:GeometryData = null;

        //virtual
        //todo remove?
        public init(){
        }

        public getChild(type:BufferDataType) {
            var result:any = null;
                //geometryData = null;

            switch (type) {
                case BufferDataType.VERTICE:
                    result = this.getVertice(type);
                    break;
                case BufferDataType.NORMAL:
                    result = this.getNormal(type);
                    break;



                //case BufferDataType.TANGENT:
                //
                //    break;
                //case BufferDataType.COLOR:
                //    geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
                //    result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);
                //    break;
                //case BufferDataType.INDICE:
                //    geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
                //    result = ElementBuffer.create(new Uint16Array(geometryData), BufferType.UNSIGNED_SHORT);
                //    break;
                //case BufferDataType.TEXCOORD:
                //    geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
                //    result = ArrayBuffer.create(new Float32Array(geometryData), 2, BufferType.FLOAT);
                //    break;




                case BufferDataType.TANGENT:
                    result = this._getTangent(type);
                    break;
                case BufferDataType.COLOR:
                    result = this._getColor(type);
                    break;
                case BufferDataType.INDICE:
                    result = this._getIndice(type);
                    break;
                case BufferDataType.TEXCOORD:
                    result = this._getTexCoord(type);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNKNOW(`BufferDataType: ${type}`));
                    break;
            }

            return result;

        }

        public hasChild(type:BufferDataType) {
            var data = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            return data && data.length > 0;
        }

        public dispose(){
            this.container.forEach((buffer:Buffer) => {
                buffer.dispose();
            });
        }

        protected abstract getVertice(type);
        protected abstract getNormal(type);

        protected container:dyCb.Hash<Buffer> = dyCb.Hash.create<Buffer>();

        //todo refactor
        private _getTangent(type){
            var cacheData = this.container.getChild(type),
                geometryData = null,
                result = null;

            if(!this._needReCalcuteTangent(type) && cacheData){
                return cacheData;
            }

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);

            this.container.addChild(<any>type, result);

            return result;
        }

        private _getColor(type) {
            var cacheData = this.container.getChild(type),
                geometryData = null,
                result = null;

            if (cacheData) {
                return cacheData;
            }

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);

            this.container.addChild(<any>type, result);

            return result;
        }

        private _getIndice(type){
            var cacheData = this.container.getChild(type),
                geometryData = null,
                result = null;

            if (cacheData) {
                return cacheData;
            }

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ElementBuffer.create(new Uint16Array(geometryData), BufferType.UNSIGNED_SHORT);

            this.container.addChild(<any>type, result);

            return result;
        }

        private _getTexCoord(type){
            var cacheData = this.container.getChild(type),
                geometryData = null,
                result = null;

            if (cacheData) {
                return cacheData;
            }

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 2, BufferType.FLOAT);

            this.container.addChild(<any>type, result);

            return result;
        }

        private _needReCalcuteTangent(type:BufferDataType){
            return this.geometryData.isTangentDirty && type === BufferDataType.TANGENT;
        }
    }
}
