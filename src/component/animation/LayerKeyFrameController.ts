module wd{
    export abstract class LayerKeyFrameController{
        private _isFinishAnimation:boolean = false;
        get isFinishAnimation(){
            if(!this.isPlayed){
                return true;
            }

            return this._isFinishAnimation;
        }
        set isFinishAnimation(isFinishAnimation:boolean){
            this._isFinishAnimation = isFinishAnimation;
        }

        public isPlayed:boolean = false;

        protected startFrameDataMap:wdCb.Hash<any> = wdCb.Hash.create<any>();
        protected currentAnimData:wdCb.Collection<KeyFrameAnimationFrameData> = null;
        protected currentFrameData:KeyFrameAnimationFrameData = null;

        private _frameCount:number = null;
        private _currentAnimName:string = null;
        private _currentFrame:number = null;
        private _beginElapsedTimeOfFirstFrame:number = null;
        private _prevFrameTime:number = null;
        private _prevFrameData:KeyFrameAnimationFrameData = null;

        public abstract saveZeroTimeFrameData():void;
        public abstract updateTargets(elapsed:number, pauseDuration:number):void;

        @ensure(function(){
            it(`should exist animation name:${this.currentAnimName}`, () => {
                expect(this.currentAnimData).exist;
            });

            this.currentAnimData.forEach((data:KeyFrameAnimationFrameData) => {
                it("time should >= 0", () => {
                    expect(data.time).gte(0);
                });
                it("KeyFrameAnimationFrameData->targets.getCount() should > 0", () => {
                    expect(data.targets.getCount()).greaterThan(0);
                });

                data.targets.forEach((target:KeyFrameAnimationFrameTargetData) => {
                    var data = target.data;

                    switch (target.target){
                        case EKeyFrameAnimationTarget.TRANSLATION:
                            it("if target:EKeyFrameAnimationTarget === TRANSLATION, its data must be Vector3", () => {
                                expect(data).instanceof(Vector3);
                            });
                            break;
                        case EKeyFrameAnimationTarget.ROTATION:
                            it("if target:EKeyFrameAnimationTarget === ROTATION, its data must be Vector3", () => {
                                expect(data).instanceof(Quaternion);
                            });
                            break;
                        case EKeyFrameAnimationTarget.SCALE:
                            it("if target:EKeyFrameAnimationTarget === SCALE, its data must be Vector3", () => {
                                expect(data).instanceof(Vector3);
                            });
                            break;
                        case EKeyFrameAnimationTarget.TEXTURE_OFFSET:
                            it("if target:EKeyFrameAnimationTarget === TEXTURE_OFFSET, its data must be Array", () => {
                                expect(data).be.a("array");
                            });
                            break;
                        default:
                            Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EKeyFrameAnimationTarget:${target.target}`));
                            break;
                    }
                })
            })
        })
        public setCurrentAnimData(animName:string, data:wdCb.Collection<KeyFrameAnimationFrameData>){
            this._currentAnimName = animName;
            this.currentAnimData = data;
        }

        public updateCurrentFrameData(){
            this.currentFrameData = this.currentAnimData.getChild(this._currentFrame);
        }

        public hasCurrentAnimData(){
            return this.currentAnimData !== null;
        }

        public setBeginElapsedTimeOfFirstFrame(currentTime:number){
            if(this._beginElapsedTimeOfFirstFrame === null){
                this._beginElapsedTimeOfFirstFrame = currentTime;
            }
        }

        public savePrevFrameData(){
            this.saveStartFrameData(this._prevFrameData);
        }

        public resetAnim(){
            this._beginElapsedTimeOfFirstFrame = null;
            this._prevFrameTime = 0;
            this._currentFrame = 0;
            this.currentAnimData = null;
            this.currentFrameData = null;
            this.isFinishAnimation = false;

            this._prevFrameData = null;

            this.startFrameDataMap.removeAllChildren();
        }

        public setFrameCount(){
            this._frameCount = this.currentAnimData.getCount();
        }




        public updateFrame(elapsed:number, pauseDuration:number){
            this._updateCurrentFrameIndex(elapsed, pauseDuration);

            if(this._isFinishAllFrames()){
                this._currentFrame = 0;
                this._beginElapsedTimeOfFirstFrame = this._getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsed);
                this._prevFrameTime = 0;

                this._prevFrameData = this.currentAnimData.getChild(this._frameCount - 1);
                this.updateCurrentFrameData();

                this.isFinishAnimation = true;
            }
            else{
                this._prevFrameTime = this.currentAnimData.getChild(this._currentFrame - 1).time;
            }
        }

        @require(function(elapsed:number, pauseDuration:number){
            this._judgeBeginElapsedTime(elapsed, "_contract_isFirstUpdate1");
            it(`elapsed of current frame:${elapsed - this._beginElapsedTimeOfFirstFrame - pauseDuration} should >= 0`, () => {
                expect(elapsed - this._beginElapsedTimeOfFirstFrame - pauseDuration).gte(0);
            });
        })
        public isCurrentFrameFinish(elapsed:number, pauseDuration:number):boolean{
            return elapsed - this._beginElapsedTimeOfFirstFrame - pauseDuration > this.currentFrameData.time;
        }

        @require(function(frameData:any){
            it("should set currentFrameData", () => {
                expect(this.currentFrameData).not.null;
            });

            this.currentFrameData.targets.forEach((currentTarget:any, index:number) => {
                it("the current frame and the start frame should modify the same targets", () => {
                    expect(frameData.targets.getChild(index).target === currentTarget.target).true;
                });
            });
        })
        protected saveStartFrameData(frameData:KeyFrameAnimationFrameData){
            var startFrameDataMap = this.startFrameDataMap;

            frameData.targets.forEach((target:KeyFrameAnimationFrameTargetData) => {
                startFrameDataMap.addChild(<any>target.target, target.data);
            });
        }

        @require(function(elapsed:number, pauseDuration:number, interpolationMethod:EKeyFrameInterpolation){
            this._judgeBeginElapsedTime(elapsed, "_contract_isFirstUpdate2");
        })
        @ensure(function(interpolation:number, elapsed:number, interpolationMethod:EKeyFrameInterpolation){
            it(`interpolation:${interpolation} >= 0 && <= 1`, () => {
                expect(interpolation >= 0 && interpolation <= 1).true;
            });
        })
        protected computeInterpolation(elapsed:number, pauseDuration:number, interpolationMethod:EKeyFrameInterpolation){
            var interpolation:number = null;

            switch (interpolationMethod){
                case EKeyFrameInterpolation.LINEAR:
                    if(this.currentFrameData.time - this._prevFrameTime === 0){
                        interpolation = 1;
                    }
                    else{
                        interpolation = (elapsed - this._beginElapsedTimeOfFirstFrame - pauseDuration - this._prevFrameTime) / (this.currentFrameData.time - this._prevFrameTime);
                    }
                    break;
                case EKeyFrameInterpolation.SWITCH:
                    if(this.currentFrameData.time - this._prevFrameTime === 0){
                        interpolation = 1;
                    }
                    else{
                        interpolation = 0;
                    }
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${interpolationMethod}`));
                    break
            }

            return interpolation;
        }

        @require(function(elapsed:number){
            var lastEndFrameTime = this.currentAnimData.getChild(this._frameCount - 1).time;

            it(`elapsed:${elapsed} should >= lastEndFrameTime:${lastEndFrameTime}`, () => {
                expect(elapsed).gte(lastEndFrameTime);
            });
        })
        private _getBeginElapsedTimeOfFirstFrameWhenFinishAllFrames(elapsed:number){
            return elapsed;
        }

        private _isFinishAllFrames(){
            return this._currentFrame >= this._frameCount;
        }

        private _updateCurrentFrameIndex(elapsed:number, pauseDuration:number){
            do{
                this._currentFrame++;

                this._prevFrameData = this.currentFrameData;
                this.updateCurrentFrameData();
            }while(!this._isFinishAllFrames() && this.isCurrentFrameFinish(elapsed, pauseDuration));
        }

        private _judgeBeginElapsedTime(elapsed:number, isFirstUpdateAttributeName:string){
            it("the _beginElapsedTime should === elapsed at the first time of the update", () => {
                if(this[isFirstUpdateAttributeName]){ expect(elapsed).equals(this._beginElapsedTimeOfFirstFrame);
                    this[isFirstUpdateAttributeName] = false;
                }
            }, this);
        }
    }
}

