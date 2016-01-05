/// <reference path="../../../filePath.d.ts"/>
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

        @require(function (type:BufferDataType) {
            assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, Log.info.FUNC_SHOULD("set morphTargets"));
        })
        protected getVertice(type:BufferDataType) {
            return this._getMorphData(type, this.geometryData.morphTargets);
        }

        @require(function (type:BufferDataType) {
            assert(this.geometryData.morphTargets && this.geometryData.morphTargets.getCount() > 0, Log.info.FUNC_SHOULD("set morphTargets"));
        })
        protected getNormal(type:BufferDataType) {
            return this._getMorphData(type, this.geometryData.morphNormals);
        }

        private _getMorphData(type:BufferDataType, morphDataTargets:wdCb.Hash<wdCb.Collection<Array<number>>>):Array<ArrayBuffer> {
            var cacheData = null,
                frames = null,
                result = null;

            if(this._isNotPlayAnimation()){
                return this._getStaticData(type);
            }

            frames = morphDataTargets.getChild(this._animation.currentAnimName);

            wdCb.Log.error(!frames, wdCb.Log.info.FUNC_SHOULD(`"${this._animation.currentAnimName}" animation`, "contain frame data"));

            cacheData = this.container.getChild(<any>type);

            if (!cacheData) {
                let currentBuffer = this._getCurrentBuffer(type),
                    nextBuffer = this._getNextBuffer(type);

                currentBuffer.resetData(new Float32Array(frames.getChild(this._animation.currentFrame)), 3, BufferType.FLOAT);
                nextBuffer.resetData(new Float32Array(frames.getChild(this._animation.nextFrame)), 3, BufferType.FLOAT);


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
                    newNextBuffer = currentBuffer.resetData(new Float32Array(frames.getChild(this._animation.nextFrame)));

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

        @require(function(type:BufferDataType){
            assert(type === BufferDataType.VERTICE || type === BufferDataType.NORMAL, Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
        })
        private _getCurrentBuffer(type:BufferDataType){
            if(type === BufferDataType.VERTICE){
                this.createBufferOnlyOnce("_currentVerticeBuffer", ArrayBuffer);

                return this._currentVerticeBuffer;
            }

            this.createBufferOnlyOnce("_currentNormalBuffer", ArrayBuffer);

            return this._currentNormalBuffer;
        }

        @require(function(type:BufferDataType){
            assert(type === BufferDataType.VERTICE || type === BufferDataType.NORMAL, Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
        })
        private _getNextBuffer(type:BufferDataType){
            if(type === BufferDataType.VERTICE){
                this.createBufferOnlyOnce("_nextVerticeBuffer", ArrayBuffer);

                return this._nextVerticeBuffer;
            }

            this.createBufferOnlyOnce("_nextNormalBuffer", ArrayBuffer);

            return this._nextNormalBuffer;
        }

        private _isCacheNotChange(type:BufferDataType){
            return !this._isCacheChangeFlag[type];
        }

        private _isNotPlayAnimation(){
            return this._animation.currentAnimName === null;
        }

        @cache(function(type:BufferDataType){
            return this.container.hasChild(this._getStaticDataCacheData(type));
        }, function(type){
            return this.container.getChild(this._getStaticDataCacheData(type))
        }, function(result, type){
            this.container.addChild(this._getStaticDataCacheData(type), result);
        })
        private _getStaticData(type:BufferDataType){
            var data = null,
                result = null;

            switch(type){
                case BufferDataType.VERTICE:
                    data = this.geometryData.vertices;
                    break;
                case BufferDataType.NORMAL:
                    data = this.geometryData.normals;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
                    break;
            }

            this._animation.interpolation = 0;

            result = [
                this._getCurrentBuffer(type).resetData(
                    new Float32Array(data), 3, BufferType.FLOAT
                ),
                this._getNextBuffer(type).resetData(
                    new Float32Array(data), 3, BufferType.FLOAT
                )
                ];

            return result;
        }

        private _getStaticDataCacheData(type:BufferDataType){
            return `static_${type}`;
        }
    }
}
