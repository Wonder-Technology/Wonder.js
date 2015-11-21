/// <reference path="../../../definitions.d.ts"/>
module dy {
    export abstract class BufferContainer {
        public geometryData:GeometryData = null;

        //virtual
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

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type) && !this._needReCalcuteTangent(type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getTangent(type){
            var geometryData = null,
                result = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);

            return result;
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getColor(type) {
            var geometryData = null,
                result = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 3, BufferType.FLOAT);

            return result;
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getIndice(type){
            var geometryData = null,
                result = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ElementBuffer.create(new Uint16Array(geometryData), BufferType.UNSIGNED_SHORT);

            return result;
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getTexCoord(type){
            var geometryData = null,
                result = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
            result = ArrayBuffer.create(new Float32Array(geometryData), 2, BufferType.FLOAT);

            return result;
        }

        private _needReCalcuteTangent(type:BufferDataType){
            return this.geometryData.isTangentDirty && type === BufferDataType.TANGENT;
        }
    }
}
