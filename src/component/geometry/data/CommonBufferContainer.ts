module wd {
    export class CommonBufferContainer extends BufferContainer{
        public static create(entityObject:GameObject) {
        	var obj = new this(entityObject);

        	return obj;
        }

        public geometryData:CommonGeometryData;

        private _verticeBuffer:ArrayBuffer = null;
        private _normalBuffer:ArrayBuffer = null;

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getVertice(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            this.createBufferOnlyOnce("_verticeBuffer", ArrayBuffer);

            this._verticeBuffer.resetData(new Float32Array(geometryData), 3, EBufferType.FLOAT);

            return this._verticeBuffer;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getNormal(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            this.createBufferOnlyOnce("_normalBuffer", ArrayBuffer);

            this._normalBuffer.resetData(new Float32Array(geometryData), 3, EBufferType.FLOAT);

            return this._normalBuffer;
        }
    }
}
