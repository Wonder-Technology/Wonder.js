module wd {
    export class SkinSkeletonBufferContainer extends CommonBufferContainer {
        public static create(entityObject:GameObject) {
            var obj = new this(entityObject);

            return obj;
        }

        public geometryData:SkinSkeletonGeometryData;

        private _jointIndiceBuffer:ArrayBuffer = null;
        private _jointWeightBuffer:ArrayBuffer = null;

        public createBuffersFromGeometryData(){
            super.createBuffersFromGeometryData();

            this.getChild(EBufferDataType.JOINT_INDICE);
            this.getChild(EBufferDataType.JOINT_WEIGHT);
        }

        protected getBuffer(type:EBufferDataType){
            var result = null;

           switch (type){
               case EBufferDataType.JOINT_INDICE:
                   result = this._getJointIndice(type);
                   break;
               case EBufferDataType.JOINT_WEIGHT:
                   result = this._getJointWeight(type);
                   break;
               default:
                   Log.error(true, wdCb.Log.info.FUNC_UNKNOW(`EBufferDataType: ${type}`));
                   break;
           }

           return result;
        }

        @cacheBufferForBufferContainer()
        private _getJointIndice(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_jointIndiceBuffer", geometryData, 4);

            return this._jointIndiceBuffer;
        }

        @cacheBufferForBufferContainer()
        private _getJointWeight(type:EBufferDataType) {
            var geometryData= this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_jointWeightBuffer", geometryData, 4);

            return this._jointWeightBuffer;
        }
    }
}
