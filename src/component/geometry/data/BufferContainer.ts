module wd {
    export abstract class BufferContainer {
        constructor(entityObject:GameObject) {
            this.entityObject = entityObject;
        }

        public geometryData:GeometryData = null;

        protected entityObject:GameObject = null;
        protected container:wdCb.Hash<Buffer> = wdCb.Hash.create<Buffer>();

        private _colorBuffer:ArrayBuffer = null;
        private _texCoordBuffer:ArrayBuffer = null;
        private _tangentBuffer:ArrayBuffer = null;
        private _indiceBuffer:ElementBuffer = null;
        private _materialChangeSubscription:wdFrp.IDisposable = null;

        public init(){
            var self = this;

            this._materialChangeSubscription = EventManager.fromEvent(this.entityObject, <any>EEngineEvent.MATERIAL_CHANGE)
            .subscribe(() => {
                self.removeCache(EBufferDataType.COLOR);
                self.geometryData.colorDirty = true;
            });

            this.geometryData.init();
        }

        public removeCache(type:EBufferDataType){
            this.container.removeChild(type);
        }

        public getChild(type:EBufferDataType) {
            var result:any = null;

            switch (type) {
                case EBufferDataType.VERTICE:
                    result = this.getVertice(type);
                    break;
                case EBufferDataType.NORMAL:
                    result = this.getNormal(type);
                    break;
                case EBufferDataType.TANGENT:
                    result = this._getTangent(type);
                    break;
                case EBufferDataType.COLOR:
                    result = this._getColor(type);
                    break;
                case EBufferDataType.INDICE:
                    result = this._getIndice(type);
                    break;
                case EBufferDataType.TEXCOORD:
                    result = this._getTexCoord(type);
                    break;
                default:
                    wdCb.Log.error(true, wdCb.Log.info.FUNC_UNKNOW(`EBufferDataType: ${type}`));
                    break;
            }

            return result;

        }

        public dispose(){
            this.container.forEach((buffer:Buffer) => {
                buffer.dispose();
            });

            this.geometryData.dispose();

            this._materialChangeSubscription && this._materialChangeSubscription.dispose();
        }

        public createBuffersFromGeometryData(){
            this.getChild(EBufferDataType.VERTICE);
            this.getChild(EBufferDataType.NORMAL);
            this.getChild(EBufferDataType.TANGENT);
            this.getChild(EBufferDataType.COLOR);
            this.getChild(EBufferDataType.INDICE);
            this.getChild(EBufferDataType.TEXCOORD);
        }

        protected abstract getVertice(type);
        protected abstract getNormal(type);

        protected createBufferOnlyOnce(bufferAttriName:string, bufferClass:any){
            if(this[bufferAttriName]){
                return;
            }

            this[bufferAttriName] = bufferClass.create();
        }

        protected hasData(data:Array<number>) {
            return data && data.length > 0;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type) && !this._needReCalcuteTangent(type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getTangent(type){
            var geometryData = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createBufferOnlyOnce("_tangentBuffer", ArrayBuffer);

            this._tangentBuffer.resetData(new Float32Array(geometryData), 3, EBufferType.FLOAT);

            return this._tangentBuffer;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getColor(type) {
            var geometryData = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createBufferOnlyOnce("_colorBuffer", ArrayBuffer);

            this._colorBuffer.resetData(new Float32Array(geometryData), 3, EBufferType.FLOAT);

            return this._colorBuffer;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getIndice(type){
            var geometryData = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createBufferOnlyOnce("_indiceBuffer", ElementBuffer);

            this._indiceBuffer.resetData(new Uint16Array(geometryData), EBufferType.UNSIGNED_SHORT);

            return this._indiceBuffer;
        }

        @cache(function(type:EBufferDataType){
            return this.container.hasChild(<any>type);
        }, function(type){
            return this.container.getChild(<any>type)
        }, function(result, type){
            this.container.addChild(<any>type, result);
        })
        private _getTexCoord(type){
            var geometryData = null;

            geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];

            if(!this.hasData(geometryData)){
                return null;
            }

            this.createBufferOnlyOnce("_texCoordBuffer", ArrayBuffer);

            this._texCoordBuffer.resetData(new Float32Array(geometryData), 2, EBufferType.FLOAT);

            return this._texCoordBuffer;
        }

        private _needReCalcuteTangent(type:EBufferDataType){
            return this.geometryData.tangentDirty && type === EBufferDataType.TANGENT;
        }
    }
}
