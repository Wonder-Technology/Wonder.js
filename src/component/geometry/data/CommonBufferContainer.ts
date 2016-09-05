module wd {
    export abstract class CommonBufferContainer extends BufferContainer{
        public geometryData:BasicGeometryData;

        private _verticeBuffer:ArrayBuffer = null;
        private _normalBuffer:ArrayBuffer = null;


        public getBufferForRenderSort():Buffer{
            var buffer = this.getChild(EBufferDataType.VERTICE);

            if(!buffer){
                return null;
            }

            return buffer;
        }

        @cacheBufferForBufferContainer()
        protected getVertice(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_verticeBuffer", geometryData, 3);

            return this._verticeBuffer;
        }

        @cacheBufferForBufferContainer()
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
