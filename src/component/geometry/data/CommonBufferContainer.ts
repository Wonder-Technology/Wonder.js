/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class CommonBufferContainer extends BufferContainer{
        public static create(entityObject:GameObject) {
        	var obj = new this(entityObject);

        	return obj;
        }

        public geometryData:CommonGeometryData;

        private _verticeBuffer:ArrayBuffer = null;
        private _normalBuffer:ArrayBuffer = null;

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getVertice(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            this.createBufferOnlyOnce("_verticeBuffer", ArrayBuffer);

            this._verticeBuffer.resetData(new Float32Array(geometryData), 3, BufferType.FLOAT);

            return this._verticeBuffer;
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getNormal(type:BufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            this.createBufferOnlyOnce("_normalBuffer", ArrayBuffer);

            this._normalBuffer.resetData(new Float32Array(geometryData), 3, BufferType.FLOAT);

            return this._normalBuffer;
        }
    }
}
