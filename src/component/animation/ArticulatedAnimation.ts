module wd{
    export class ArticulatedAnimation extends Animation{
        public static create() {
            var obj = new this();

            return obj;
        }

        get isStart(){
            return this._state === AnimationState.RUN;
        }
        get isStop(){
            return this._state === AnimationState.STOP;
        }
        get isPause(){
            return this._state === AnimationState.PAUSE;
        }

        //todo private
        public interpolation:number = null;
        public currentKey:number = null;
        public currentAnimName:string = null;
        public data:ArticulatedAnimationData = null;

        private _beginElapsedTimeOfFirstKey:number = null;
        private _lastKeyTime:number = null;
        private _keyCount:number = null;
        private _state:AnimationState = AnimationState.DEFAULT;
        private _currentAnimData:wdCb.Collection<ArticulatedAnimationKeyData> = null;
        private _currentKeyData:ArticulatedAnimationKeyData = null;
        private _preKeyData:ArticulatedAnimationKeyData = null;
        private _isKeyChange:boolean = false;
        private _nextKeyDataMap = wdCb.Hash.create<any>();

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string){
            this.data.getChild(animName).forEach((data:ArticulatedAnimationKeyData) => {
                assert(data.time > 0, Log.info.FUNC_SHOULD("time", "> 0"));

                assert(data.targets.getCount() > 0, Log.info.FUNC_SHOULD("ArticulatedAnimationKeyData->targets.getCount()", "> 0"));

                data.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                    var data = target.data;

                    switch (target.target){
                        case ArticulatedAnimationTarget.TRANSLATION:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:ArticulatedAnimationTarget === TRANSLATION, its data", "Vector3"));
                            break;
                        case ArticulatedAnimationTarget.ROTATION:
                            assert(data instanceof Quaternion, Log.info.FUNC_MUST_BE("if target:ArticulatedAnimationTarget ===ROTATION, its data", "Quaternion"));
                            break;
                        case ArticulatedAnimationTarget.SCALE:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:ArticulatedAnimationTarget === SCALE, its data", "Vector3"));
                            break;
                        default:
                            Log.error(true, Log.info.FUNC_NOT_SUPPORT(`ArticulatedAnimationTarget:${target.target}`));
                            break;
                    }
                })
            })
        })
        public play(animName:string){
            this.currentAnimName = animName;

            this._currentAnimData = this.data.getChild(animName);

            this._beginElapsedTimeOfFirstKey = Director.getInstance().elapsed;
            this._lastKeyTime = 0;
            this._keyCount = this._currentAnimData.getCount();
            this.currentKey = 0;

            this._updateCurrentKeyData();

            this._state = AnimationState.RUN;
        }

        private _updateCurrentKeyData(){
            this._preKeyData = this._currentKeyData;
            this._currentKeyData = this._currentAnimData.getChild(this.currentKey);
        }

        public pause(){
        }

        public resume(){
        }

        public stop(){
        }

        public update(elapsedTime:number){
            //todo test
            if(this._state === AnimationState.DEFAULT){
                return;
            }

            if(this._isCurrentKeyFinish(elapsedTime)){
                this._updateCurrentKey();
            }
            else{
                this._isKeyChange = false;
            }


            this._computeInterpolation(elapsedTime);

            this._updateTargets();
        }

        private _isCurrentKeyFinish(elapsedTime:number){
           return elapsedTime - this._beginElapsedTimeOfFirstKey > this._currentKeyData.time;
        }

        private _updateCurrentKey(){
            this._isKeyChange = true;

            this.currentKey++;

            if(this.currentKey >= this._keyCount){
                this.currentKey = 0;
                this._beginElapsedTimeOfFirstKey = this._currentAnimData.getChild(this._keyCount - 1).time;
                this._lastKeyTime = 0;
            }
            else{
                this._lastKeyTime = this._currentAnimData.getChild(this.currentKey - 1).time;
            }

            this._updateCurrentKeyData();
        }

        private _computeInterpolation(elapsedTime:number){
            switch (this._currentKeyData.interpolationMethod){
                case KeyFrameInterpolation.LINEAR:
                    this.interpolation = (elapsedTime - this._beginElapsedTimeOfFirstKey - this._lastKeyTime) / (this._currentKeyData.time - this._lastKeyTime);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${this._currentKeyData.interpolationMethod}`));
                    break
            }
        }

        private _updateTargets(){
            var self = this,
                transform = this.entityObject.transform,
                interpolation = this.interpolation,
                isKeyChange = this._isKeyChange,
                nextKeyDataMap = this._nextKeyDataMap;

            if(isKeyChange){
                this._updateTargetsToBeLastNextKeyData();
            }

            this._currentKeyData.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                var data = target.data;

                switch (target.target){
                    case ArticulatedAnimationTarget.TRANSLATION:
                        transform.position = Vector3.create().lerp(transform.position, data, interpolation);
                        break;
                    case ArticulatedAnimationTarget.ROTATION:
                        transform.rotation = Quaternion.create().slerp(transform.rotation, data, interpolation);
                        break;
                    case ArticulatedAnimationTarget.SCALE:
                        transform.scale = Vector3.create().lerp(transform.scale, data, interpolation);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`ArticulatedAnimationTarget:${target.target}`));
                        break;
                }


                if(isKeyChange || !nextKeyDataMap.hasChild(<any>target.target)){
                    nextKeyDataMap.addChild(<any>target.target, data);
                }
            });
        }

        @require(function(){
            assert(this._preKeyData !== null, Log.info.FUNC_SHOULD_NOT("preKeyData", "be null"));
        })
        private _updateTargetsToBeLastNextKeyData(){
            var self = this,
                transform = this.entityObject.transform,
                nextKeyDataMap = this._nextKeyDataMap;

            this._preKeyData.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                var lastNextKeyData = nextKeyDataMap.hasChild(<any>target.target) ? nextKeyDataMap.getChild(<any>target.target) : target.data;

                self._setTargetData(target.target, transform, lastNextKeyData);
            });
        }

        private _setTargetData(target:ArticulatedAnimationTarget, transform:ThreeDTransform, data:any){
            switch (target){
                case ArticulatedAnimationTarget.TRANSLATION:
                    transform.position = data;
                    break;
                case ArticulatedAnimationTarget.ROTATION:
                    transform.rotation = data;
                    break;
                case ArticulatedAnimationTarget.SCALE:
                    transform.scale = data;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`ArticulatedAnimationTarget:${target}`));
                    break;
            }
        }
    }

    enum AnimationState{
        DEFAULT,
        RUN,
        STOP,
        PAUSE
    }


    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<ArticulatedAnimationKeyData>>

    export type ArticulatedAnimationKeyData = {
        time:number,
        interpolationMethod:KeyFrameInterpolation,

        targets:wdCb.Collection<ArticulatedAnimationKeyTargetData>
    }

    export type ArticulatedAnimationKeyTargetData = {
        target:ArticulatedAnimationTarget,
        data:any
    }
}

