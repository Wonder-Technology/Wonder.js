module wd{
    export class MorphAnimation extends Animation{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        get nextFrame(){
            var nextFrame = this.currentFrame + 1;

            if(nextFrame >= this._frameCount){
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
        private _frameCount:number = null;
        private _pauseDuration:number = null;

        public init(){
        }

        public dispose(){
        }

        @require(function(animName:string, fps:number){
            var geometry = this.entityObject.getComponent(ModelGeometry);

            assert(geometry, Log.info.FUNC_SHOULD("this entityObject", "add ModelGeometry component"));
            assert(geometry.morphTargets.getChild(animName) && geometry.morphTargets.getChild(animName).getCount() > 0, Log.info.FUNC_NOT_EXIST(`"${animName}" animation`));
        })
        @ensure(function(){
            assert(this._frameCount > 1, Log.info.FUNC_SHOULD("frames.count", "> 1"));
        })
        public play(animName:string, fps:number){
            var geometry = this.entityObject.getComponent<ModelGeometry>(ModelGeometry);

            this.currentAnimName = animName;
            this.fps = fps;

            this.duration = 1.0 / fps * 1000;

            this._frameCount = geometry.morphTargets.getChild(animName).getCount();

            this._start();
        }

        protected getPauseTime(){
            return this._getCurrentTime();
        }

        protected getResumeTime(){
            return this._getCurrentTime();
        }

        private _getCurrentTime(){
            return Director.getInstance().elapsed;
        }

        protected handleWhenPause(elapsedTime:number):void{
        }

        protected handleWhenCurrentFrameFinish(elapsedTime:number):void{
            this.isFrameChange = true;

            this._prevFrameEndTime = (elapsedTime - this._pauseDuration) - (elapsedTime - this._pauseDuration) % this.duration;

            this.currentFrame++;

            if(this.currentFrame >= this._frameCount){
                this.currentFrame = 0;
            }
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            if(this._prevFrameEndTime === null){
                this._prevFrameEndTime = this._getCurrentTime();
            }
        }

        @require(function(elapsedTime:number){
            assert(elapsedTime - this._prevFrameEndTime - this._pauseDuration >= 0, Log.info.FUNC_SHOULD(`elapsedTime of current frame:${elapsedTime - this._prevFrameEndTime - this._pauseDuration}`, ">= 0"));
        })
        protected isCurrentFrameFinish(elapsedTime:number):boolean{
            return elapsedTime - this._prevFrameEndTime - this._pauseDuration > this.duration;
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(elapsedTime:number):void{
            this._computeInterpolation(elapsedTime);
        }

        protected continueFromPausePoint(elapsedTime:number){
            this._pauseDuration += this.resumeTime - this.pauseTime;
        }

        private _start(){
            this._prevFrameEndTime = null;
            this.currentFrame = 0;
            this._pauseDuration = 0;

            this.state = EAnimationState.RUN;//
        }

        @ensure(function(){
            var interpolation = this.interpolation;

            assert(interpolation >= 0 && interpolation <= 1 , Log.info.FUNC_SHOULD(`interpolation(${interpolation}`, ">= 0 && <= 1"));
        })
        private _computeInterpolation(elapsedTime:number):void{
            this.interpolation = this.fps * (elapsedTime - this._prevFrameEndTime - this._pauseDuration) / 1000;
        }
    }

    export type MorphTargetsData = wdCb.Collection<Array<number>>
}

