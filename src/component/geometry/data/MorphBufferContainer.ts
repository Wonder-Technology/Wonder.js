/// <reference path="../../../filePath.d.ts"/>
module dy {
    export class MorphBufferContainer extends BufferContainer {
        public static create(animation:MorphAnimation) {
            var obj = new this(animation);

            return obj;
        }

        constructor(animation:MorphAnimation) {
            super();

            this._animation = animation;
        }

        public geometryData:MorphGeometryData;

        protected container:dyCb.Hash<Buffer&Array<ArrayBuffer>>;

        private _animation:MorphAnimation = null;
        private _isCacheChangeFlag:any = {};
        private _isCacheChangeInLastLoop = {};

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

        private _getMorphData(type:BufferDataType, morphDataTargets:dyCb.Hash<dyCb.Collection<Array<number>>>):Array<ArrayBuffer> {
            var cacheData = null,
                frames = null,
                result = null;

            if(this._isNotPlayAnimation()){
                return this._getStaticData(type);
            }

            frames = morphDataTargets.getChild(this._animation.currentAnimName);

            dyCb.Log.error(!frames, dyCb.Log.info.FUNC_SHOULD(`"${this._animation.currentAnimName}" animation`, "contain frame data"));

            cacheData = this.container.getChild(<any>type);

            if (!cacheData) {
                let currentBuffer = ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.currentFrame)), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                    nextBuffer = ArrayBuffer.create(new Float32Array(frames.getChild(this._animation.nextFrame)), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW);

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
        @require(function(type:BufferDataType){
            
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
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_SHOULD("type", "be BufferDataType.VERTICE or BufferDataType.NORMAL"));
                    break;
            }

            this._animation.interpolation = 0;

            result = [
                ArrayBuffer.create(new Float32Array(data), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                //todo optimize: nextFrameData to be identity array?
                ArrayBuffer.create(new Float32Array(data), 3, BufferType.FLOAT, BufferUsage.DYNAMIC_DRAW),
                ];

            return result;
        }

        private _getStaticDataCacheData(type:BufferDataType){
            return `static_${type}`;
        }
    }
}
