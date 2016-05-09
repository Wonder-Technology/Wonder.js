module wd {
    export class CommonBufferContainer extends BufferContainer{
        public static create(entityObject:GameObject) {
        	var obj = new this(entityObject);

        	return obj;
        }

        public geometryData:CommonGeometryData;

        private _verticeBuffer:ArrayBuffer = null;
        private _normalBuffer:ArrayBuffer = null;


        public getBufferForRenderSort():Buffer{
            var buffer = this.getChild(EBufferDataType.VERTICE);

            if(!buffer){
                return null;
            }

            return buffer;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        protected getVertice(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_verticeBuffer", geometryData, 3);

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

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_normalBuffer", geometryData, 3);

            return this._normalBuffer;
        }
    }
}
