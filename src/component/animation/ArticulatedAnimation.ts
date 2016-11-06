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

                it(`should exist animation index:${animIndex}`, () => {
                    expect(this.data.getCount()).greaterThan(animIndex);
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                it(`should exist animation name:${animName}`, () => {
                    expect(this.data.hasChild(animName)).true;
                });
            }
        })
        @ensure(function(){
            it(`should exist animation name:${this._currentAnimName}`, () => {
                expect(this._currentAnimData).exist;
            });

            this._currentAnimData.forEach((data:ArticulatedAnimationFrameData) => {
                it("time should >= 0", () => {
                    expect(data.time).gte(0);
                });
                it("ArticulatedAnimationFrameData->targets.getCount() should > 0", () => {
                    expect(data.targets.getCount()).greaterThan(0);
                });

                data.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                    var data = target.data;

                    switch (target.target){
                        case EArticulatedAnimationTarget.TRANSLATION:
                            it("if target:EArticulatedAnimationTarget === TRANSLATION, its data must be Vector3", () => {
                                expect(data).instanceof(Vector3);
                            });
                            break;
                        case EArticulatedAnimationTarget.ROTATION:
                            it("if target:EArticulatedAnimationTarget === ROTATION, its data must be Vector3", () => {
                                expect(data).instanceof(Quaternion);
                            });
                            break;
                        case EArticulatedAnimationTarget.SCALE:
                            it("if target:EArticulatedAnimationTarget === SCALE, its data must be Vector3", () => {
                                expect(data).instanceof(Vector3);
                            });
                            break;
                        case EArticulatedAnimationTarget.TEXTURE_OFFSET:
                            it("if target:EArticulatedAnimationTarget === TEXTURE_OFFSET, its data must be Array", () => {
                                expect(data).be.a("array");
                            });
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

            this._saveStartFrameData(this._currentAnimData.getChild(0));

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
                startFrameDataMap = this._startFrameDataMap;

            this._currentFrameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                var endFrameData = target.data,
                    startFrameData = startFrameDataMap.getChild(<any>target.target),
                    interpolation = self._computeInterpolation(elapsed, target.interpolationMethod);

                self._updateTarget(target, startFrameData, endFrameData, interpolation);
            });
        }

        @require(function(target:ArticulatedAnimationFrameTargetData, startFrameData:TextureArticulatedAnimationFrameTargetData, endFrameData:TextureArticulatedAnimationFrameTargetData, interpolation:number){
            it("transform animation->interpolationMethod shouldn't be SWITCH", () => {
                switch (target.target){
                    case EArticulatedAnimationTarget.TRANSLATION:
                    case EArticulatedAnimationTarget.ROTATION:
                    case EArticulatedAnimationTarget.SCALE:
                        expect(startFrameData.interpolationMethod).not.equals(EKeyFrameInterpolation.SWITCH);
                        expect(endFrameData.interpolationMethod).not.equals(EKeyFrameInterpolation.SWITCH);
                        break;
                }
            });
        })
        private _updateTarget(target:ArticulatedAnimationFrameTargetData, startFrameData:any, endFrameData:any, interpolation:number){
            var transform = this.entityObject.transform;

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
                case EArticulatedAnimationTarget.TEXTURE_OFFSET:
                    this._updateTextureData(target, startFrameData, endFrameData, interpolation);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                    break;
            }
        }

        @require(function(target:ArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            it("material should has the corresponding animated texture", () => {
                expect(this.entityObject.getGeometry().material[target.extra.target]).exist;
            }, this);
            it("this animated texture should has 'sourceRegion' attribute", () => {
                expect(this.entityObject.getGeometry().material[target.extra.target].sourceRegion).not.be.a("undefined");
            }, this);
            it("texture animation->interpolationMethod should be SWITCH", () => {
                expect(target.interpolationMethod).equals(EKeyFrameInterpolation.SWITCH);
            });
        })
        private _updateTextureData(target:ArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            var material:Material = this.entityObject.getComponent<Geometry>(Geometry).material,
                mapName:string = target.extra.target,
                map:BasicTexture = material[mapName];

            if(!!map){
                //todo optimize:use temp RectRegion
                map.sourceRegion = RectRegion.create(startFrameData[0], startFrameData[1], startFrameData[2], startFrameData[3]);
            }
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
                case EKeyFrameInterpolation.SWITCH:
                    interpolation = 1;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_NOT_SUPPORT(`interpolationMethod:${interpolationMethod}`));
                    break
            }

            return interpolation;
        }

        @require(function(frameData:ArticulatedAnimationFrameData){
            var frameData:ArticulatedAnimationFrameData = args[0];

            assert(this._currentFrameData !== null, Log.info.FUNC_SHOULD("set currentFrameData"));

            this._currentFrameData.targets.forEach((currentTarget:ArticulatedAnimationFrameTargetData, index:number) => {
                assert(frameData.targets.getChild(index).target === currentTarget.target, Log.info.FUNC_SHOULD("the current frame and the start frame", "modify the same targets"));
            });
        })
        private _saveStartFrameData(frameData:ArticulatedAnimationFrameData){
            var startFrameDataMap = this._startFrameDataMap,
                frameData:ArticulatedAnimationFrameData = args[0];

            frameData.targets.forEach((target:ArticulatedAnimationFrameTargetData) => {
                startFrameDataMap.addChild(<any>target.target, target.data);
            });
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
    }

    export type ArticulatedAnimationData = wdCb.Hash<wdCb.Collection<ArticulatedAnimationFrameData>>

    export type ArticulatedAnimationFrameData = {
        time:number,

        targets:wdCb.Collection<ArticulatedAnimationFrameTargetData>
    }

    export type ArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:any,
        extra?:any
    }

    export type TextureArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:Array<number>,
        extra:{
            target:string
        }
    }
}

