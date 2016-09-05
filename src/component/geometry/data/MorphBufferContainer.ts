module wd {
    export class MorphBufferContainer extends BufferContainer {
        public static create(entityObject:GameObject, animation:MorphAnimation) {
            var obj = new this(entityObject, animation);

            return obj;
        }

        constructor(entityObject:GameObject, animation:MorphAnimation) {
            super(entityObject);

            this._animation = animation;
        }

        public geometryData:MorphGeometryData;

        protected container:wdCb.Hash<Buffer&Array<ArrayBuffer>>;

        private _animation:MorphAnimation = null;
        private _isCacheChangeFlag:any = {};
        private _isCacheChangeInLastLoop = {};
        private _currentVerticeBuffer:ArrayBuffer = null;
        private _nextVerticeBuffer:ArrayBuffer = null;
        private _currentNormalBuffer:ArrayBuffer = null;
        private _nextNormalBuffer:ArrayBuffer = null;

        public getBufferForRenderSort():Buffer{
            return null;
        }

        @require(function (type:EBufferDataType) {
            assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, Log.info.FUNC_SHOULD("set morphTargets"));
        })
        protected getVertice(type:EBufferDataType) {
            return this._getMorphData(type, this.geometryData.morphTargets);
        }

        @require(function (type:EBufferDataType) {
            assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, Log.info.FUNC_SHOULD("set morphTargets"));
        })
        protected getNormal(type:EBufferDataType) {
            return this._getMorphData(type, this.geometryData.morphNormals);
        }

        private _getMorphData(type:EBufferDataType, morphDataTargets:wdCb.Hash<wdCb.Collection<Array<number>>>):Array<ArrayBuffer> {
            var cacheData = null,
                frames = null,
                result = null;

            if(this._isNotPlayAnimation()){
                return this._getStaticData(type);
            }

            if(morphDataTargets.getCount() === 0){
                return null;
            }

            frames = this._getFrames(morphDataTargets);

            cacheData = this.container.getChild(<any>type);

            if (!cacheData) {
                let currentBuffer = this._getCurrentBufferWhichIsCreatedOnlyOnce(type, frames.getChild(this._animation.currentFrame), 3),
                    nextBuffer = this._getNextBufferWhichIsCreatedOnlyOnce(type, frames.getChild(this._animation.nextFrame), 3);

                result = [currentBuffer, nextBuffer];

                this.container.addChild(<any>type, result);
                this._isCacheChangeInLastLoop[type] = false;
            }
            else {
                if (this._animation.isFrameChange && (this._isCacheChangeInLastLoop[type] || this._isCacheNotChange(type))) {
                    let [currentBuffer, nextBuffer] = cacheData,
                        newCurrentBuffer = null,
                        newNextBuffer = null;


                    //todo use double-buffer cache?
                    newCurrentBuffer = nextBuffer;
                    newNextBuffer = currentBuffer.resetData(frames.getChild(this._animation.nextFrame));

                    result = [newCurrentBuffer, newNextBuffer];

                    this.container.addChild(<any>type, result);

                    this._isCacheChangeFlag[type] = true;
                    this._isCacheChangeInLastLoop[type] = true;
                }
                else {
                    this._isCacheChangeFlag[type] = false;
                    this._isCacheChangeInLastLoop[type] = false;

                    result = cacheData;
                }
            }

            return result;
        }

        @ensure(function(frames:wdCb.Collection<Array<number>>){
            wdCb.Log.error(!frames, wdCb.Log.info.FUNC_SHOULD(`"${this._animation.currentAnimName}" animation`, "contain frame data"));
        })
        private _getFrames(morphDataTargets:wdCb.Hash<wdCb.Collection<Array<number>>>){
            return morphDataTargets.getChild(this._animation.currentAnimName);
        }

        @require(function(type:EBufferDataType, data:Array<number>, size:number){
            assert(type === EBufferDataType.VERTICE || type === EBufferDataType.NORMAL, Log.info.FUNC_SHOULD("type", "be EBufferDataType.VERTICE or EBufferDataType.NORMAL"));
        })
        private _getCurrentBufferWhichIsCreatedOnlyOnce(type:EBufferDataType, data:Array<number>, size:number){
            if(type === EBufferDataType.VERTICE){
                this.createOnlyOnceAndUpdateArrayBuffer("_currentVerticeBuffer", data, size, EBufferType.FLOAT, 0, EBufferUsage.DYNAMIC_DRAW);

                return this._currentVerticeBuffer;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_currentNormalBuffer", data, size, EBufferType.FLOAT, 0, EBufferUsage.DYNAMIC_DRAW);

            return this._currentNormalBuffer;
        }

        @require(function(type:EBufferDataType, data:Array<number>, size:number){
            assert(type === EBufferDataType.VERTICE || type === EBufferDataType.NORMAL, Log.info.FUNC_SHOULD("type", "be EBufferDataType.VERTICE or EBufferDataType.NORMAL"));
        })
        private _getNextBufferWhichIsCreatedOnlyOnce(type:EBufferDataType, data:Array<number>, size:number){
            if(type === EBufferDataType.VERTICE){
                this.createOnlyOnceAndUpdateArrayBuffer("_nextVerticeBuffer", data, size, EBufferType.FLOAT, 0, EBufferUsage.DYNAMIC_DRAW);

                return this._nextVerticeBuffer;
            }

            this.createOnlyOnceAndUpdateArrayBuffer("_nextNormalBuffer", data, size, EBufferType.FLOAT, 0, EBufferUsage.DYNAMIC_DRAW);

            return this._nextNormalBuffer;
        }

        private _isCacheNotChange(type:EBufferDataType){
            return !this._isCacheChangeFlag[type];
        }

        private _isNotPlayAnimation(){
            return this._animation.currentAnimName === null;
        }

        @cacheBufferForBufferContainerWithFuncParam("_getStaticDataCacheData")
        private _getStaticData(type:EBufferDataType){
            var data = null,
                result = null;

            switch(type){
                case EBufferDataType.VERTICE:
                    data = this.geometryData.vertices;
                    break;
                case EBufferDataType.NORMAL:
                    data = this.geometryData.normals;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_SHOULD("type", "be EBufferDataType.VERTICE or EBufferDataType.NORMAL"));
                    break;
            }

            if(!this.hasData(data)){
                return null;
            }

            this._animation.interpolation = 0;

            result = [
                this._getCurrentBufferWhichIsCreatedOnlyOnce(type, data, 3),
                this._getNextBufferWhichIsCreatedOnlyOnce(type, data, 3),
                ];

            return result;
        }

        private _getStaticDataCacheData(type:EBufferDataType){
            return `static_${type}`;
        }
    }
}
