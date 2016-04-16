module wd{
    export class MorphAnimation extends Animation{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get nextFrame(){
            var nextFrame = this.currentFrame + 1;

            if(nextFrame >= this.frameCount){
                nextFrame = 0;
            }

            return nextFrame;
        }

        public interpolation:number = 0;
        public currentFrame:number = 0;
        public duration:number = null;
        public fps:number = null;
        public currentAnimName:string = null;

        private _prevFrameEndTime:number = null;

        public init(){
        }

        public dispose(){
        }

        //todo fix
        public clone(){
            return MorphAnimation.create();
        }

        @require(function(animName:string, fps:number){
            var geometry = this.entityObject.getComponent(ModelGeometry);

            assert(geometry, Log.info.FUNC_SHOULD("this entityObject", "add ModelGeometry component"));
            assert(geometry.morphTargets.getChild(animName) && geometry.morphTargets.getChild(animName).getCount() > 0, Log.info.FUNC_NOT_EXIST(`"${animName}" animation`));
        })
        @ensure(function(){
            assert(this.frameCount > 1, Log.info.FUNC_SHOULD("frames.count", "> 1"));
        })
        public play(animName:string, fps:number){
            var geometry = this.entityObject.getComponent<ModelGeometry>(ModelGeometry);

            this.currentAnimName = animName;
            this.fps = fps;

            this.duration = 1.0 / fps * 1000;

            this.frameCount = geometry.morphTargets.getChild(animName).getCount();

            this.resetAnim();

            this.state = EAnimationState.RUN;
        }

        protected handleWhenPause(elapsedTime:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsedTime:number):void{
            this.isFrameChange = true;

            this._prevFrameEndTime = MathUtils.maxFloorIntegralMultiple((elapsedTime - this.pauseDuration), this.duration);

            this.currentFrame++;

            if(this._isFinishAllFrames()){
                this.currentFrame = 0;
            }
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            if(this._prevFrameEndTime === null){
                this._prevFrameEndTime = this.getCurrentTime();
            }
        }

        @require(function(elapsedTime:number){
            assert(elapsedTime - this._prevFrameEndTime - this.pauseDuration >= 0, Log.info.FUNC_SHOULD(`elapsedTime of current frame:${elapsedTime - this._prevFrameEndTime - this.pauseDuration}`, ">= 0"));
        })
        protected isCurrentFrameFinish(elapsedTime:number):boolean{
            return elapsedTime - this._prevFrameEndTime - this.pauseDuration > this.duration;
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            this._computeInterpolation(elapsedTime);
        }

        protected resetAnim(){
            this._prevFrameEndTime = null;
            this.currentFrame = 0;
            this.pauseDuration = 0;
        }

        @ensure(function(){
            var interpolation = this.interpolation;

            assert(interpolation >= 0 && interpolation <= 1 , Log.info.FUNC_SHOULD(`interpolation(${interpolation}`, ">= 0 && <= 1"));
        })
        private _computeInterpolation(elapsedTime:number):void{
            this.interpolation = this.fps * (elapsedTime - this._prevFrameEndTime - this.pauseDuration) / 1000;
        }

        private _isFinishAllFrames(){
            return this.currentFrame >= this.frameCount;
        }
    }

    export type MorphTargetsData = wdCb.Collection<Array<number>>
}

