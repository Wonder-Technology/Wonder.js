module wd{
    export class ArticulatedAnimation extends Animation{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public data:ArticulatedAnimationData = null;

        private _currentFrame:number = null;
        private _currentAnimName:string = null;
        private _beginElapsedTimeOfFirstFrame:number = null;
        private _prevFrameTime:number = null;
        private _currentAnimData:wdCb.Collection<ArticulatedAnimationFrameData> = null;
        private _currentFrameData:ArticulatedAnimationFrameData = null;
        private _prevFrameData:ArticulatedAnimationFrameData = null;
        private _startFrameDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public init(){
        }

        public dispose(){
        }

        public play(animName:string);
        public play(animIndex:number);

        @require(function(...args){
            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0];

                assert(this.data.getCount() >= animIndex + 1, Log.info.FUNC_NOT_EXIST(`animation index:${animIndex}`));
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                assert(this.data.hasChild(animName), Log.info.FUNC_NOT_EXIST(`animation name:${animName}`));
            }
        })
        @ensure(function(){
            assert(!!this._currentAnimData, Log.info.FUNC_NOT_EXIST(`animation name:${this._currentAnimName}`));

            this._currentAnimData.forEach((data:ArticulatedAnimationFrameData) => {
                assert(data.time >= 0, Log.info.FUNC_SHOULD("time", ">= 0"));

                assert(data.targets.getCount() > 0, Log.info.FUNC_SHOULD("ArticulatedAnimationFrameData->targets.getCount()", "> 0"));

                data.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                    var data = target.data;

                    switch (target.target){
                        case EArticulatedAnimationTarget.TRANSLATION:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget === TRANSLATION, its data", "Vector3"));
                            break;
                        case EArticulatedAnimationTarget.ROTATION:
                            assert(data instanceof Quaternion, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget ===ROTATION, its data", "Quaternion"));
                            break;
                        case EArticulatedAnimationTarget.SCALE:
                            assert(data instanceof Vector3, Log.info.FUNC_MUST_BE("if target:EArticulatedAnimationTarget === SCALE, its data", "Vector3"));
                            break;
                        default:
                            Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                            break;
                    }
                })
            })
        })
        public play(...args){
            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0],
                    i = 0,
                    self = this;

                this.data.forEach((data:wdCb.Collection<ArticulatedAnimationFrameData>, animName:string) => {
                    if(animIndex === i){
                        self._currentAnimName = animName;
                        self._currentAnimData = data;

                        return wdCb.$BREAK;
                    }

                    i++;
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                this._currentAnimName = animName;
                this._currentAnimData = this.data.getChild(animName);
            }

            this.resetAnim();
            this._saveStartFrameData(this.entityObject.transform);

            this.frameCount = this._currentAnimData.getCount();
            this.state = EAnimationState.RUN;
        }

        protected handleWhenPause(elapsed:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsed:number):void{
            this.isFrameChange = true;

            this._updateFrame(elapsed);
            this._saveStartFrameData(this._prevFrameData);
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsed:number):void{
            if(this._beginElapsedTimeOfFirstFrame === null){
                this._beginElapsedTimeOfFirstFrame = this.getCurrentTime();
            }
        }

        @require(function(elapsed:number){
            assert(elapsed - this._beginElapsedTimeOfFirstFrame - this.pauseDuration >= 0, Log.info.FUNC_SHOULD(`elapsed of current frame:${elapsed - this._beginElapsedTimeOfFirstFrame - this.pauseDuration}`, ">= 0"));
        })
        protected isCurrentFrameFinish(elapsed:number):boolean{
            return elapsed - this._beginElapsedTimeOfFirstFrame - this.pauseDuration > this._currentFrameData.time;
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsed:number):void{
            this._updateTargets(elapsed);
        }

        protected resetAnim(){
            this._beginElapsedTimeOfFirstFrame = null;
            this._prevFrameTime = 0;
            this.pauseDuration = 0;
            this._currentFrame = 0;

            this._prevFrameData = null;
            this._updateCurrentFrameData();

            this._startFrameDataMap.removeAllChildren();
        }

        private _updateTargets(elapsed:number):void{
            var self = this,
                transform = this.entityObject.transform,
                startFrameDataMap = this._startFrameDataMap;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target),
                    interpolation = self._computeInterpolation(elapsed, target.interpolationMethod);

                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                        transform.localPosition = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.ROTATION:
                        transform.localRotation = Quaternion.create().slerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.SCALE:
                        transform.localScale = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                        break;
                }
            });
        }

        @ensure(function(interpolation:number, elapsed:number, interpolationMethod:EKeyFrameInterpolation){
            assert(interpolation >= 0 && interpolation <= 1 , Log.info.FUNC_SHOULD(`interpolation:${interpolation}`, ">= 0 && <= 1"));
        })
        private _computeInterpolation(elapsed:number, interpolationMethod:EKeyFrameInterpolation){
            var interpolation:number = null;

            switch (interpolationMethod){
                case EKeyFrameInterpolation.LINEAR:
                    if(this._currentFrameData.time - this._prevFrameTime === 0){
                        interpolation = 1;
                    }
                    else{
                        interpolation = (elapsed - this._beginElapsedTimeOfFirstFrame - this.pauseDuration - this._prevFrameTime) / (this._currentFrameData.time - this._prevFrameTime);
                    }
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${interpolationMethod}`));
                    break
            }

            return interpolation;
        }


        private _saveStartFrameData(frameData:ArticulatedAnimationFrameData);
        private _saveStartFrameData(startTransform:ThreeDTransform);

        @require(function(...args){
            if(this._isFrameData(args[0])){
                let frameData:ArticulatedAnimationFrameData = args[0];

                assert(this._currentFrameData !== null, Log.info.FUNC_SHOULD("set currentFrameData"));

                this._currentFrameData.targets.forEach((currentTarget:ArticulatedAnimationFrameTargetData, index:number) => {
                    assert(frameData.targets.getChild(index).target === currentTarget.target, Log.info.FUNC_SHOULD("the current frame and the start frame", "modify the same targets"));
                });
            }
        })
        private _saveStartFrameData(...args){
            var startFrameDataMap = this._startFrameDataMap;

            if(this._isFrameData(args[0])){
                let frameData:ArticulatedAnimationFrameData = args[0];

                frameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                    startFrameDataMap.addChild(<any>target.target, target.data);
                });
            }
            else{
                let transform:ThreeDTransform = args[0];

                startFrameDataMap.addChild(<any>EArticulatedAnimationTarget.TRANSLATION, transform.localPosition);
                startFrameDataMap.addChild(<any>EArticulatedAnimationTarget.ROTATION, transform.localRotation);
                startFrameDataMap.addChild(<any>EArticulatedAnimationTarget.SCALE, transform.localScale);
            }
        }

        private _updateCurrentFrameData(){
            this._currentFrameData = this._currentAnimData.getChild(this._currentFrame);
        }

        private _updateFrame(elapsed:number){
            this._updateCurrentFrameIndex(elapsed);

            if(this._isFinishAllFrames()){
                this._currentFrame = 0;
                this._beginElapsedTimeOfFirstFrame = this._getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsed);
                this._prevFrameTime = 0;

                this._prevFrameData = this._currentAnimData.getChild(this.frameCount - 1);
                this._updateCurrentFrameData();
            }
            else{
                this._prevFrameTime = this._currentAnimData.getChild(this._currentFrame - 1).time;
            }
        }

        @require(function(elapsed:number){
            var lastEndFrameTime = this._currentAnimData.getChild(this.frameCount - 1).time;

            assert(elapsed >= lastEndFrameTime, Log.info.FUNC_SHOULD(`elapsed:${elapsed}`, `>= lastEndFrameTime:${lastEndFrameTime}`));
        })
        private _getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsed:number){
            return MathUtils.maxFloorIntegralMultiple(elapsed, this._currentAnimData.getChild(this.frameCount - 1).time);
        }

        private _isFinishAllFrames(){
            return this._currentFrame >= this.frameCount;
        }

        private _updateCurrentFrameIndex(elapsed:number){
            do{
                this._currentFrame++;

                this._prevFrameData = this._currentFrameData;
                this._updateCurrentFrameData();
            }while(!this._isFinishAllFrames() && this.isCurrentFrameFinish(elapsed));
        }

        private _isFrameData(data:any){
            return data.time !== void 0 && data.targets !== void 0;
        }
    }

    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<ArticulatedAnimationFrameData>>

    export type ArticulatedAnimationFrameData = {
        time:number,

        targets:wdCb.Collection<ArticulatedAnimationFrameTargetData>
    }

    export type ArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:any
    }
}

