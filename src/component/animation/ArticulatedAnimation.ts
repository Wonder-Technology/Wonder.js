module wd{
    export class ArticulatedAnimation extends Animation{
        public static create() {
            var obj = new this();

            return obj;
        }

        public data:ArticulatedAnimationData = null;

        private _interpolation:number = null;
        private _currentFrame:number = null;
        private _currentAnimName:string = null;
        private _beginElapsedTimeOfFirstFrame:number = null;
        private _lastFrameTime:number = null;
        private _pauseDuration:number = null;
        private _frameCount:number = null;
        private _currentAnimData:wdCb.Collection<ArticulatedAnimationFrameData> = null;
        private _currentFrameData:ArticulatedAnimationFrameData = null;
        private _prevFrameData:ArticulatedAnimationFrameData = null;
        private _prevEndFrameDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        private _startFrameDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string){
            this.data.getChild(animName).forEach((data:ArticulatedAnimationFrameData) => {
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
        public play(animName:string){
            this._currentAnimName = animName;
            this._currentAnimData = this.data.getChild(animName);
            this._resetAnim();
            this._saveStartFrameData();
            this._frameCount = this._currentAnimData.getCount();
            this.state = EAnimationState.RUN;
        }

        protected getPauseTime(){
            return this._getCurrentTime();
        }

        protected getResumeTime(){
            return this._getCurrentTime();
        }

        protected handleWhenPause(elapsedTime:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsedTime:number):void{
            this._updateCurrentFrame(elapsedTime);
            this._updateTargetsToBeLastEndFrameData();
            this._saveStartFrameData();
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
        }

        protected isCurrentFrameFinish(elapsedTime:number):boolean{
            return elapsedTime - this._beginElapsedTimeOfFirstFrame - this._pauseDuration > this._currentFrameData.time;
        }

        protected computeInterpolation(elapsedTime:number):void{
            switch (this._currentFrameData.interpolationMethod){
                case EKeyFrameInterpolation.LINEAR:
                    if(this._currentFrameData.time - this._lastFrameTime === 0){
                        this._interpolation = 1;
                    }
                    else{
                        this._interpolation = (elapsedTime - this._beginElapsedTimeOfFirstFrame - this._pauseDuration - this._lastFrameTime) / (this._currentFrameData.time - this._lastFrameTime);
                    }
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${this._currentFrameData.interpolationMethod}`));
                    break
            }
        }

        protected updateTargets():void{
            var transform = this.entityObject.transform,
                interpolation = this._interpolation,
                isFrameChange = this.isFrameChange,
                prevEndFrameDataMap = this._prevEndFrameDataMap,
                startFrameDataMap = this._startFrameDataMap;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target);

                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                        transform.position = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.ROTATION:
                        transform.rotation = Quaternion.create().slerp(startFrameData, endFrameData, interpolation);
                        break;
                    case EArticulatedAnimationTarget.SCALE:
                        transform.scale = Vector3.create().lerp(startFrameData, endFrameData, interpolation);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                        break;
                }

                if(isFrameChange || !prevEndFrameDataMap.hasChild(<any>target.target)){
                    prevEndFrameDataMap.addChild(<any>target.target, endFrameData);
                }
            });
        }

        protected continueFromPausePoint(elapsedTime:number){
            this._pauseDuration += this.resumeTime - this.pauseTime;
        }

        private _resetAnim(){
            this._beginElapsedTimeOfFirstFrame = this._getCurrentTime();
            this._lastFrameTime = 0;
            this._pauseDuration = 0;
            this._currentFrame = 0;

            this._prevFrameData = null;
            this._updateCurrentFrameData();

            this._prevEndFrameDataMap.removeAllChildren();
            this._startFrameDataMap.removeAllChildren();
        }

        private _getCurrentTime(){
            return Director.getInstance().elapsed;
        }

        @require(function(){
            assert(this._currentFrameData !== null, Log.info.FUNC_SHOULD("set currentFrameData"));
        })
        private _saveStartFrameData(){
            var startFrameDataMap = this._startFrameDataMap,
                transform = this.entityObject.transform;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var startFrameData = null;

                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                        startFrameData = transform.position;
                        break;
                    case EArticulatedAnimationTarget.ROTATION:
                        startFrameData = transform.rotation;
                        break;
                    case EArticulatedAnimationTarget.SCALE:
                        startFrameData = transform.scale;
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                        break;
                }

                startFrameDataMap.addChild(<any>target.target, startFrameData);
            });
        }

        private _updateCurrentFrameData(){
            this._currentFrameData = this._currentAnimData.getChild(this._currentFrame);
        }

        private _updateCurrentFrame(elapsedTime:number){
            this.isFrameChange = true;

            this._currentFrame++;

            if(this._currentFrame >= this._frameCount){
                this._currentFrame = 0;
                this._beginElapsedTimeOfFirstFrame = elapsedTime -  elapsedTime % this._currentAnimData.getChild(this._frameCount - 1).time;
                this._lastFrameTime = 0;
            }
            else{
                this._lastFrameTime = this._currentAnimData.getChild(this._currentFrame - 1).time;
            }

            this._prevFrameData = this._currentFrameData;
            this._updateCurrentFrameData();
        }

        @require(function(){
            assert(this._prevFrameData !== null, Log.info.FUNC_SHOULD_NOT("prevFrameData", "be null"));
        })
        private _updateTargetsToBeLastEndFrameData(){
            var self = this,
                transform = this.entityObject.transform,
                prevEndFrameDataMap = this._prevEndFrameDataMap;

            this._prevFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var prevEndFrameData = prevEndFrameDataMap.hasChild(<any>target.target) ? prevEndFrameDataMap.getChild(<any>target.target) : target.data;

                self._setTargetData(target.target, transform, prevEndFrameData);
            });
        }

        private _setTargetData(target:EArticulatedAnimationTarget, transform:ThreeDTransform, data:any){
            switch (target){
                case EArticulatedAnimationTarget.TRANSLATION:
                    transform.position = data;
                    break;
                case EArticulatedAnimationTarget.ROTATION:
                    transform.rotation = data;
                    break;
                case EArticulatedAnimationTarget.SCALE:
                    transform.scale = data;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target}`));
                    break;
            }
        }
    }

    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<ArticulatedAnimationFrameData>>

    export type ArticulatedAnimationFrameData = {
        time:number,
        interpolationMethod:EKeyFrameInterpolation,

        targets:wdCb.Collection<ArticulatedAnimationFrameTargetData>
    }

    export type ArticulatedAnimationFrameTargetData = {
        target:EArticulatedAnimationTarget,
        data:any
    }
}

