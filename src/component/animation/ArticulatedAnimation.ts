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
        private _pauseTime:number = null;
        private _resumeTime:number = null;
        private _pauseDuration:number = null;
        private _keyCount:number = null;
        private _state:AnimationState = AnimationState.DEFAULT;
        private _currentAnimData:wdCb.Collection<ArticulatedAnimationKeyData> = null;
        private _currentKeyData:ArticulatedAnimationKeyData = null;
        private _prevKeyData:ArticulatedAnimationKeyData = null;
        private _isKeyChange:boolean = false;
        private _isResume:boolean = false;
        private _prevEndKeyDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _startKeyDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string){
            this.data.getChild(animName).forEach((data:ArticulatedAnimationKeyData) => {
                assert(data.time >= 0, Log.info.FUNC_SHOULD("time", ">= 0"));

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

            this._resetAnim();

            this._saveStartKeyData();

            this._keyCount = this._currentAnimData.getCount();
            this._state = AnimationState.RUN;
        }

        private _resetAnim(){
            this._beginElapsedTimeOfFirstKey = this._getCurrentTime();

            this._lastKeyTime = 0;

            this._pauseDuration = 0;

            this.currentKey = 0;

            this._prevKeyData = null;
            this._updateCurrentKeyData();

            this._prevEndKeyDataMap.removeAllChildren();
            this._startKeyDataMap.removeAllChildren();
        }

        private _getCurrentTime(){
            return Director.getInstance().elapsed;
        }

        @require(function(){
            assert(this._currentKeyData !== null, Log.info.FUNC_SHOULD("set currentKeyData"));
        })
        private _saveStartKeyData(){
            var startKeyDataMap = this._startKeyDataMap,
                transform = this.entityObject.transform;

            this._currentKeyData.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                var startKeyData = null;

                switch (target.target){
                    case ArticulatedAnimationTarget.TRANSLATION:
                        startKeyData = transform.position;
                        break;
                    case ArticulatedAnimationTarget.ROTATION:
                        startKeyData = transform.rotation;
                        break;
                    case ArticulatedAnimationTarget.SCALE:
                        startKeyData = transform.scale;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`ArticulatedAnimationTarget:${target.target}`));
                        break;
                }

                startKeyDataMap.addChild(<any>target.target, startKeyData);
            });
        }

        private _updateCurrentKeyData(){
            this._currentKeyData = this._currentAnimData.getChild(this.currentKey);
        }

        public pause(){
            this._state = AnimationState.PAUSE;
            this._pauseTime = this._getCurrentTime();
        }

        public resume(){
            this._state = AnimationState.RUN;

            this._isResume = true;
            this._resumeTime = this._getCurrentTime();
        }

        public stop(){
            this._state = AnimationState.STOP;
        }

        public update(elapsedTime:number){
            if(this._state === AnimationState.DEFAULT || this.isStop || this.isPause){
                return;
            }

            if(this._isResume){
                this._isResume = false;
                this._continueFromPausePoint();
            }

            if(this._isCurrentKeyFinish(elapsedTime)){
                this._updateCurrentKey(elapsedTime);


                this._updateTargetsToBeLastEndKeyData();
                this._saveStartKeyData();
            }
            else{
                this._isKeyChange = false;
            }


            this._computeInterpolation(elapsedTime);

            this._updateTargets();
        }

        private _continueFromPausePoint(){
            this._pauseDuration += this._resumeTime - this._pauseTime;
            //this._oldTime = currentTime - (this._resumeTime - this._pauseTime) % this.duration;
        }

        private _isCurrentKeyFinish(elapsedTime:number){
           return elapsedTime - this._beginElapsedTimeOfFirstKey - this._pauseDuration > this._currentKeyData.time;
        }

        private _updateCurrentKey(elapsedTime:number){
            this._isKeyChange = true;

            this.currentKey++;

            if(this.currentKey >= this._keyCount){
                this.currentKey = 0;
                this._beginElapsedTimeOfFirstKey = elapsedTime -  elapsedTime % this._currentAnimData.getChild(this._keyCount - 1).time;
                //this._pauseDuration = 0;
                this._lastKeyTime = 0;
            }
            else{
                this._lastKeyTime = this._currentAnimData.getChild(this.currentKey - 1).time;
            }

            this._prevKeyData = this._currentKeyData;
            this._updateCurrentKeyData();
        }

        private _computeInterpolation(elapsedTime:number){
            switch (this._currentKeyData.interpolationMethod){
                case KeyFrameInterpolation.LINEAR:
                    if(this._currentKeyData.time - this._lastKeyTime === 0){
                        this.interpolation = 1;
                    }
                    else{
                        this.interpolation = (elapsedTime - this._beginElapsedTimeOfFirstKey - this._pauseDuration - this._lastKeyTime) / (this._currentKeyData.time - this._lastKeyTime);
                    }
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${this._currentKeyData.interpolationMethod}`));
                    break
            }
        }

        private _updateTargets(){
            var transform = this.entityObject.transform,
                interpolation = this.interpolation,
                isKeyChange = this._isKeyChange,
                prevEndKeyDataMap = this._prevEndKeyDataMap,
                startKeyDataMap = this._startKeyDataMap;

            this._currentKeyData.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                var endKeyData = target.data;

                switch (target.target){
                    case ArticulatedAnimationTarget.TRANSLATION:
                        transform.position = Vector3.create().lerp(startKeyDataMap.getChild(<any>target.target), endKeyData, interpolation);
                        break;
                    case ArticulatedAnimationTarget.ROTATION:
                        transform.rotation = Quaternion.create().slerp(startKeyDataMap.getChild(<any>target.target), endKeyData, interpolation);
                        break;
                    case ArticulatedAnimationTarget.SCALE:
                        transform.scale = Vector3.create().lerp(startKeyDataMap.getChild(<any>target.target), endKeyData, interpolation);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`ArticulatedAnimationTarget:${target.target}`));
                        break;
                }


                if(isKeyChange || !prevEndKeyDataMap.hasChild(<any>target.target)){
                    prevEndKeyDataMap.addChild(<any>target.target, endKeyData);
                }
            });
        }

        @require(function(){
            assert(this._prevKeyData !== null, Log.info.FUNC_SHOULD_NOT("prevKeyData", "be null"));
        })
        private _updateTargetsToBeLastEndKeyData(){
            var self = this,
                transform = this.entityObject.transform,
                prevEndKeyDataMap = this._prevEndKeyDataMap;

            this._prevKeyData.targets.forEach((target:ArticulatedAnimationKeyTargetData) => {
                var prevEndKeyData = prevEndKeyDataMap.hasChild(<any>target.target) ? prevEndKeyDataMap.getChild(<any>target.target) : target.data;

                self._setTargetData(target.target, transform, prevEndKeyData);
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

